import uuid
from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Property(Base):
    __tablename__ = "properties"

    __table_args__ = (
        CheckConstraint(
            "purpose IN ('buy', 'rent')",
            name="ck_properties_purpose",
        ),
        CheckConstraint(
            "property_type IN ('house', 'studio', 'commercial')",
            name="ck_properties_property_type",
        ),
        CheckConstraint(
            "status IN ('draft', 'published', 'sold', 'rented', 'archived')",
            name="ck_properties_status",
        ),
        CheckConstraint(
            "price > 0",
            name="ck_properties_positive_price",
        ),
        CheckConstraint(
            "area > 0",
            name="ck_properties_positive_area",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    slug: Mapped[str] = mapped_column(
        String(180),
        unique=True,
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    purpose: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        index=True,
    )

    property_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="draft",
        index=True,
    )

    price: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False,
        index=True,
    )

    bedrooms: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    bathrooms: Mapped[Decimal] = mapped_column(
        Numeric(3, 1),
        nullable=False,
        default=1,
    )

    area: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    locality: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Mumbai",
    )

    address: Mapped[str | None] = mapped_column(
        String(300),
        nullable=True,
    )

    postal_code: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    latitude: Mapped[Decimal | None] = mapped_column(
        Numeric(9, 6),
        nullable=True,
    )

    longitude: Mapped[Decimal | None] = mapped_column(
        Numeric(9, 6),
        nullable=True,
    )

    furnished: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    availability: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Available now",
    )

    image_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    featured: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        index=True,
    )

    verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    leads: Mapped[list["Lead"]] = relationship(
        back_populates="property",
        cascade="all, delete-orphan",
    )


class Lead(Base):
    __tablename__ = "leads"

    __table_args__ = (
        CheckConstraint(
            "lead_type IN ('enquiry', 'visit')",
            name="ck_leads_lead_type",
        ),
        CheckConstraint(
            "status IN ('new', 'contacted', 'qualified', 'closed', 'spam')",
            name="ck_leads_status",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    property_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "properties.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    lead_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    email: Mapped[str] = mapped_column(
        String(320),
        nullable=False,
        index=True,
    )

    message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    preferred_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    consent: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="new",
        index=True,
    )

    source: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="website",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    property: Mapped[Property] = relationship(
        back_populates="leads",
    )


class SavedProperty(Base):
    __tablename__ = "saved_properties"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
    )
    property_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("properties.id", ondelete="CASCADE"),
        primary_key=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    __table_args__ = (
        CheckConstraint(
            "status IN ('new', 'reviewed', 'closed', 'spam')",
            name="ck_contact_messages_status",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    subject: Mapped[str] = mapped_column(String(60), nullable=False, index=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    consent: Mapped[bool] = mapped_column(Boolean, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="new", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)


class OwnerSubmission(Base):
    __tablename__ = "owner_submissions"

    __table_args__ = (
        CheckConstraint("purpose IN ('sell', 'rent')", name="ck_owner_submissions_purpose"),
        CheckConstraint("property_type IN ('house', 'studio', 'commercial')", name="ck_owner_submissions_property_type"),
        CheckConstraint("status IN ('new', 'reviewing', 'approved', 'rejected')", name="ck_owner_submissions_status"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False, index=True)
    purpose: Mapped[str] = mapped_column(String(10), nullable=False)
    property_type: Mapped[str] = mapped_column(String(20), nullable=False)
    locality: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    address: Mapped[str | None] = mapped_column(String(300), nullable=True)
    expected_price: Mapped[int] = mapped_column(BigInteger, nullable=False)
    area: Mapped[int] = mapped_column(Integer, nullable=False)
    bedrooms: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    furnishing: Mapped[str] = mapped_column(String(30), nullable=False, default="unfurnished")
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    authority_confirmed: Mapped[bool] = mapped_column(Boolean, nullable=False)
    consent: Mapped[bool] = mapped_column(Boolean, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="new", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)
