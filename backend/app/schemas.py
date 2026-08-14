import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    model_validator,
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
LeadType = Literal["enquiry", "visit"]
LeadStatus = Literal[
    "new",
    "contacted",
    "qualified",
    "closed",
    "spam",
]


class PropertyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    slug: str
    title: str
    description: str
    purpose: PropertyPurpose
    property_type: PropertyType
    status: PropertyStatus
    price: int
    bedrooms: int
    bathrooms: Decimal
    area: int
    locality: str
    city: str
    address: str | None
    postal_code: str | None
    latitude: Decimal | None
    longitude: Decimal | None
    furnished: bool
    availability: str
    image_url: str | None
    featured: bool
    verified: bool
    created_at: datetime
    updated_at: datetime


class PropertyListResponse(BaseModel):
    items: list[PropertyResponse]
    total: int = Field(ge=0)
    page: int = Field(ge=1)
    page_size: int = Field(ge=1)
    pages: int = Field(ge=0)


class LeadCreate(BaseModel):
    property_id: uuid.UUID
    lead_type: LeadType

    name: str = Field(
        min_length=2,
        max_length=120,
    )

    phone: str = Field(
        min_length=10,
        max_length=20,
        pattern=r"^[0-9+\-\s()]+$",
    )

    email: EmailStr

    message: str | None = Field(
        default=None,
        max_length=2000,
    )

    preferred_date: date | None = None

    consent: Literal[True]

    @model_validator(mode="after")
    def validate_visit_date(self) -> "LeadCreate":
        if self.lead_type == "visit":
            if self.preferred_date is None:
                raise ValueError(
                    "A preferred date is required for visit requests."
                )

            if self.preferred_date < date.today():
                raise ValueError(
                    "The preferred date cannot be in the past."
                )

        if self.lead_type == "enquiry":
            self.preferred_date = None

        self.name = self.name.strip()
        self.phone = self.phone.strip()

        if self.message is not None:
            cleaned_message = self.message.strip()
            self.message = cleaned_message or None

        return self


class LeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    property_id: uuid.UUID
    lead_type: LeadType
    name: str
    phone: str
    email: EmailStr
    message: str | None
    preferred_date: date | None
    consent: bool
    status: LeadStatus
    source: str
    created_at: datetime
    updated_at: datetime


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=20, pattern=r"^[0-9+\-\s()]*$")
    subject: Literal["property-search", "owner-support", "listing-correction", "partnership", "general"]
    message: str = Field(min_length=10, max_length=3000)
    consent: Literal[True]


class OwnerSubmissionCreate(BaseModel):
    owner_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=10, max_length=20, pattern=r"^[0-9+\-\s()]+$")
    email: EmailStr
    purpose: Literal["sell", "rent"]
    property_type: PropertyType
    locality: str = Field(min_length=2, max_length=100)
    address: str | None = Field(default=None, max_length=300)
    expected_price: int = Field(gt=0)
    area: int = Field(gt=0)
    bedrooms: int = Field(default=0, ge=0, le=20)
    furnishing: Literal["unfurnished", "semi-furnished", "furnished"]
    description: str | None = Field(default=None, max_length=3000)
    authority_confirmed: Literal[True]
    consent: Literal[True]
