import math
import uuid
from datetime import date, datetime
from typing import Annotated, Literal

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    status,
)
from pydantic import BaseModel, ConfigDict
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth import AuthenticatedUser, require_admin
from app.database import get_database_session
from app.models import ContactMessage, Lead, OwnerSubmission, Property


router = APIRouter(
    prefix="/admin",
    tags=["Administration"],
)

LeadStatus = Literal[
    "new",
    "contacted",
    "qualified",
    "closed",
    "spam",
]

LeadType = Literal[
    "enquiry",
    "visit",
]


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class AdminLeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    property_id: uuid.UUID
    property_title: str
    property_slug: str
    lead_type: LeadType
    name: str
    phone: str
    email: str
    message: str | None
    preferred_date: date | None
    status: LeadStatus
    source: str
    created_at: datetime
    updated_at: datetime


class AdminLeadListResponse(BaseModel):
    items: list[AdminLeadResponse]
    total: int
    page: int
    page_size: int
    pages: int


@router.get("/stats")
def get_admin_statistics(
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
) -> dict[str, int]:
    total_properties = database.scalar(
        select(func.count()).select_from(Property)
    ) or 0

    published_properties = database.scalar(
        select(func.count())
        .select_from(Property)
        .where(Property.status == "published")
    ) or 0

    total_leads = database.scalar(
        select(func.count()).select_from(Lead)
    ) or 0

    new_leads = database.scalar(
        select(func.count())
        .select_from(Lead)
        .where(Lead.status == "new")
    ) or 0

    enquiries = database.scalar(
        select(func.count())
        .select_from(Lead)
        .where(Lead.lead_type == "enquiry")
    ) or 0

    visit_requests = database.scalar(
        select(func.count())
        .select_from(Lead)
        .where(Lead.lead_type == "visit")
    ) or 0

    return {
        "total_properties": total_properties,
        "published_properties": published_properties,
        "total_leads": total_leads,
        "new_leads": new_leads,
        "enquiries": enquiries,
        "visit_requests": visit_requests,
    }


@router.get(
    "/leads",
    response_model=AdminLeadListResponse,
)
def list_admin_leads(
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
    lead_status: LeadStatus | None = Query(
        default=None,
        alias="status",
    ),
    lead_type: LeadType | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> AdminLeadListResponse:
    filters = []

    if lead_status is not None:
        filters.append(Lead.status == lead_status)

    if lead_type is not None:
        filters.append(Lead.lead_type == lead_type)

    total = database.scalar(
        select(func.count())
        .select_from(Lead)
        .where(*filters)
    ) or 0

    rows = database.execute(
        select(
            Lead,
            Property.title.label("property_title"),
            Property.slug.label("property_slug"),
        )
        .join(
            Property,
            Lead.property_id == Property.id,
        )
        .where(*filters)
        .order_by(Lead.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()

    items = [
        AdminLeadResponse(
            id=lead.id,
            property_id=lead.property_id,
            property_title=property_title,
            property_slug=property_slug,
            lead_type=lead.lead_type,
            name=lead.name,
            phone=lead.phone,
            email=lead.email,
            message=lead.message,
            preferred_date=lead.preferred_date,
            status=lead.status,
            source=lead.source,
            created_at=lead.created_at,
            updated_at=lead.updated_at,
        )
        for lead, property_title, property_slug in rows
    ]

    return AdminLeadListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        pages=math.ceil(total / page_size) if total else 0,
    )


@router.patch(
    "/leads/{lead_id}/status",
    response_model=AdminLeadResponse,
)
def update_lead_status(
    lead_id: uuid.UUID,
    status_data: LeadStatusUpdate,
    admin_user: Annotated[AuthenticatedUser, Depends(require_admin)],
    database: Annotated[Session, Depends(get_database_session)],
) -> AdminLeadResponse:
    row = database.execute(
        select(
            Lead,
            Property.title.label("property_title"),
            Property.slug.label("property_slug"),
        )
        .join(
            Property,
            Lead.property_id == Property.id,
        )
        .where(Lead.id == lead_id)
    ).one_or_none()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found.",
        )

    lead, property_title, property_slug = row

    lead.status = status_data.status
    database.commit()
    database.refresh(lead)

    return AdminLeadResponse(
        id=lead.id,
        property_id=lead.property_id,
        property_title=property_title,
        property_slug=property_slug,
        lead_type=lead.lead_type,
        name=lead.name,
        phone=lead.phone,
        email=lead.email,
        message=lead.message,
        preferred_date=lead.preferred_date,
        status=lead.status,
        source=lead.source,
        created_at=lead.created_at,
        updated_at=lead.updated_at,
    )


@router.get("/submissions")
def list_submissions(admin_user: Annotated[AuthenticatedUser, Depends(require_admin)], database: Annotated[Session, Depends(get_database_session)]) -> dict[str, list[dict[str, object]]]:
    owners = database.scalars(select(OwnerSubmission).order_by(OwnerSubmission.created_at.desc())).all()
    contacts = database.scalars(select(ContactMessage).order_by(ContactMessage.created_at.desc())).all()
    return {
        "owners": [{"id": str(item.id), "owner_name": item.owner_name, "email": item.email, "phone": item.phone, "purpose": item.purpose, "property_type": item.property_type, "locality": item.locality, "expected_price": item.expected_price, "area": item.area, "bedrooms": item.bedrooms, "furnishing": item.furnishing, "description": item.description, "status": item.status, "created_at": item.created_at.isoformat()} for item in owners],
        "contacts": [{"id": str(item.id), "name": item.name, "email": item.email, "phone": item.phone, "subject": item.subject, "message": item.message, "status": item.status, "created_at": item.created_at.isoformat()} for item in contacts],
    }


class SubmissionStatusUpdate(BaseModel):
    status: Literal["new", "reviewing", "approved", "rejected"]


class ContactStatusUpdate(BaseModel):
    status: Literal["new", "reviewed", "closed", "spam"]


@router.patch("/submissions/{submission_id}/status")
def update_submission_status(submission_id: uuid.UUID, data: SubmissionStatusUpdate, admin_user: Annotated[AuthenticatedUser, Depends(require_admin)], database: Annotated[Session, Depends(get_database_session)]) -> dict[str, str]:
    record = database.get(OwnerSubmission, submission_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Owner submission not found.")
    record.status = data.status
    database.commit()
    return {"id": str(record.id), "status": record.status}


@router.patch("/submissions/contact/{message_id}/status")
def update_contact_message_status(message_id: uuid.UUID, data: ContactStatusUpdate, admin_user: Annotated[AuthenticatedUser, Depends(require_admin)], database: Annotated[Session, Depends(get_database_session)]) -> dict[str, str]:
    record = database.get(ContactMessage, message_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Contact message not found.")
    record.status = data.status
    database.commit()
    return {"id": str(record.id), "status": record.status}
