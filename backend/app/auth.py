import uuid
from dataclasses import dataclass
from typing import Annotated

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_database_session


settings = get_settings()

bearer_scheme = HTTPBearer(
    auto_error=False,
)


@dataclass(frozen=True)
class AuthenticatedUser:
    id: uuid.UUID
    email: str


async def get_current_user(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
) -> AuthenticatedUser:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication is required.",
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )

    if (
        not settings.supabase_url
        or not settings.supabase_publishable_key
    ):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is not configured.",
        )

    user_endpoint = (
        f"{settings.supabase_url.rstrip('/')}/auth/v1/user"
    )

    headers = {
        "apikey": settings.supabase_publishable_key,
        "Authorization": (
            f"Bearer {credentials.credentials}"
        ),
    }

    try:
        async with httpx.AsyncClient(
            timeout=10.0,
        ) as client:
            response = await client.get(
                user_endpoint,
                headers=headers,
            )
    except httpx.RequestError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is unavailable.",
        )

    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The authentication session is invalid or expired.",
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )

    user_data = response.json()

    user_id = user_data.get("id")
    email = user_data.get("email")

    if not isinstance(user_id, str) or not isinstance(email, str):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The authentication response is invalid.",
        )

    try:
        parsed_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The authentication user ID is invalid.",
        )

    return AuthenticatedUser(
        id=parsed_user_id,
        email=email,
    )


def require_admin(
    current_user: Annotated[
        AuthenticatedUser,
        Depends(get_current_user),
    ],
    database: Annotated[
        Session,
        Depends(get_database_session),
    ],
) -> AuthenticatedUser:
    role = database.execute(
        text(
            """
            select role
            from public.profiles
            where id = :user_id
            """
        ),
        {
            "user_id": current_user.id,
        },
    ).scalar_one_or_none()

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access is required.",
        )

    return current_user
