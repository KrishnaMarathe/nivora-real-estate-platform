from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers.admin import router as admin_router
from app.routers.admin_properties import (
    router as admin_properties_router,
)
from app.routers.auth import router as auth_router
from app.routers.leads import router as leads_router
from app.routers.properties import router as properties_router
from app.routers.saved import router as saved_router
from app.routers.submissions import router as submissions_router


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="Backend API for the Nivora real-estate platform.",
    version="1.0.0",
)

allowed_origins = {
    settings.frontend_url.rstrip("/"),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=sorted(allowed_origins),
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "Authorization",
        "Content-Type",
    ],
)

app.include_router(
    properties_router,
    prefix="/api/v1",
)

app.include_router(
    leads_router,
    prefix="/api/v1",
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    admin_router,
    prefix="/api/v1",
)

app.include_router(
    admin_properties_router,
    prefix="/api/v1",
)

app.include_router(saved_router, prefix="/api/v1")
app.include_router(submissions_router, prefix="/api/v1")


@app.get(
    "/",
    tags=["System"],
)
def read_root() -> dict[str, str]:
    return {
        "name": settings.app_name,
        "status": "running",
        "version": "1.0.0",
    }


@app.get(
    "/health",
    tags=["System"],
)
def health_check() -> dict[str, str]:
    return {
        "status": "healthy",
    }
