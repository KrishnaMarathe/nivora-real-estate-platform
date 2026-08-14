from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.auth import (
    AuthenticatedUser,
    get_current_user,
    require_admin,
)
from app.database import get_database_session


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.get("/me")
def get_my_account(
    current_user: Annotated[
        AuthenticatedUser,
        Depends(get_current_user),
    ],
    database: Annotated[
        Session,
        Depends(get_database_session),
    ],
) -> dict[str, str]:
    profile = database.execute(
        text(
            """
            select
                full_name,
                role
            from public.profiles
            where id = :user_id
            """
        ),
        {
            "user_id": current_user.id,
        },
    ).mappings().one_or_none()

    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": (
            str(profile["full_name"])
            if profile
            else ""
        ),
        "role": (
            str(profile["role"])
            if profile
            else "customer"
        ),
    }


@router.get("/admin-check")
def check_admin_access(
    admin_user: Annotated[
        AuthenticatedUser,
        Depends(require_admin),
    ],
) -> dict[str, str]:
    return {
        "status": "authorized",
        "role": "admin",
        "user_id": str(admin_user.id),
    }
