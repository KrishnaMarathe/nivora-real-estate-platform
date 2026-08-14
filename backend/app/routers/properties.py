import math
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import get_database_session
from app.models import Property
from app.schemas import (
    PropertyListResponse,
    PropertyPurpose,
    PropertyResponse,
    PropertyType,
)


router = APIRouter(prefix="/properties", tags=["Properties"])
@router.get("", response_model=PropertyListResponse)
def list_properties(
    database: Annotated[Session, Depends(get_database_session)],
    purpose: PropertyPurpose | None = None,
    property_type: PropertyType | None = None,
    locality: str | None = Query(default=None, min_length=2, max_length=100),
    min_price: int | None = Query(default=None, ge=0),
    max_price: int | None = Query(default=None, ge=0),
    featured: bool | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=50),
) -> PropertyListResponse:
    filters = [Property.status == "published"]

    if purpose is not None:
        filters.append(Property.purpose == purpose)
    if property_type is not None:
        filters.append(Property.property_type == property_type)
    if locality is not None:
        filters.append(Property.locality.ilike(f"%{locality.strip()}%"))
    if min_price is not None:
        filters.append(Property.price >= min_price)
    if max_price is not None:
        filters.append(Property.price <= max_price)
    if featured is not None:
        filters.append(Property.featured == featured)

    total = database.scalar(
        select(func.count()).select_from(Property).where(*filters)
    ) or 0

    properties = database.scalars(
        select(Property)
        .where(*filters)
        .order_by(Property.featured.desc(), Property.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()

    return PropertyListResponse(
        items=list(properties),
        total=total,
        page=page,
        page_size=page_size,
        pages=math.ceil(total / page_size) if total else 0,
    )


@router.get("/{slug}", response_model=PropertyResponse)
def get_property(slug: str, database: Annotated[Session, Depends(get_database_session)]) -> Property:
    property_record = database.scalar(
        select(Property).where(
            Property.slug == slug,
            Property.status == "published",
        )
    )

    if property_record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    return property_record
