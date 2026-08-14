import uuid
from typing import Annotated, Literal

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from pydantic import BaseModel, Field, HttpUrl
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.auth import AuthenticatedUser, require_admin
from app.database import get_database_session
from app.models import Property
from app.schemas import PropertyResponse


router = APIRouter(
    prefix="/admin/properties",
    tags=["Administration - Properties"],
)

PropertyPurpose = Literal["buy", "rent"]
PropertyType = Literal["house", "studio", "commercial"]
PropertyStatus = Literal[
    "draft",
    "published",
    "sold",
    "rented",
    "archived",
]


class PropertyCreate(BaseModel):
    slug: str = Field(
        min_length=3,
        max_length=180,
        pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
    )

    title: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=20, max_length=5000)
    purpose: PropertyPurpose
    property_type: PropertyType
    status: PropertyStatus = "draft"
    price: int = Field(gt=0)
    bedrooms: int = Field(default=0, ge=0, le=20)
    bathrooms: float = Field(default=1, ge=0, le=20)
    area: int = Field(gt=0)
    locality: str = Field(min_length=2, max_length=100)
    city: str = Field(default="Mumbai", min_length=2, max_length=100)
    address: str | None = Field(default=None, max_length=300)
    postal_code: str | None = Field(default=None, max_length=10)
    furnished: bool = False
    availability: str = Field(
        default="Available now",
        min_length=2,
        max_length=100,
    )
    image_url: HttpUrl | None = None
    featured: bool = False
    verified: bool = False


class PropertyUpdate(BaseModel):
    slug: str | None = Field(
        default=None,
        min_length=3,
        max_length=180,
        pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
    )

    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=200,
    )

    description: str | None = Field(
        default=None,
        min_length=20,
        max_length=5000,
    )

    purpose: PropertyPurpose | None = None
    property_type: PropertyType | None = None
    status: PropertyStatus | None = None
    price: int | None = Field(default=None, gt=0)
    bedrooms: int | None = Field(default=None, ge=0, le=20)
    bathrooms: float | None = Field(default=None, ge=0, le=20)
    area: int | None = Field(default=None, gt=0)
    locality: str | None = Field(default=None, min_length=2, max_length=100)
    city: str | None = Field(default=None, min_length=2, max_length=100)
    address: str | None = Field(default=None, max_length=300)
    postal_code: str | None = Field(default=None, max_length=10)
    furnished: bool | None = None

    availability: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    image_url: HttpUrl | None = None
    featured: bool | None = None
    verified: bool | None = None


@router.get(
    "",
    response_model=list[PropertyResponse],
)
def list_all_properties(
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
) -> list[Property]:
    return list(
        database.scalars(
            select(Property).order_by(
                Property.created_at.desc(),
            )
        ).all()
    )


@router.post(
    "",
    response_model=PropertyResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_property(
    property_data: PropertyCreate,
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
) -> Property:
    values = property_data.model_dump()

    if values["image_url"] is not None:
        values["image_url"] = str(values["image_url"])

    property_record = Property(**values)

    try:
        database.add(property_record)
        database.commit()
        database.refresh(property_record)
    except IntegrityError:
        database.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A property with this slug already exists.",
        )

    return property_record


@router.patch(
    "/{property_id}",
    response_model=PropertyResponse,
)
def update_property(
    property_id: uuid.UUID,
    property_data: PropertyUpdate,
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
) -> Property:
    property_record = database.get(
        Property,
        property_id,
    )

    if property_record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found.",
        )

    values = property_data.model_dump(
        exclude_unset=True,
    )

    if "image_url" in values and values["image_url"] is not None:
        values["image_url"] = str(values["image_url"])

    for field_name, field_value in values.items():
        setattr(
            property_record,
            field_name,
            field_value,
        )

    try:
        database.commit()
        database.refresh(property_record)
    except IntegrityError:
        database.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A property with this slug already exists.",
        )

    return property_record
