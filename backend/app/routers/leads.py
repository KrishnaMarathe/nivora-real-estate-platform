from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_database_session
from app.models import Lead, Property
from app.schemas import LeadCreate, LeadResponse


router = APIRouter(
    prefix="/leads",
    tags=["Leads"],
)

@router.post(
    "",
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lead(
    lead_data: LeadCreate,
    database: Annotated[Session, Depends(get_database_session)],
) -> Lead:
    property_record = database.scalar(
        select(Property).where(
            Property.id == lead_data.property_id,
            Property.status == "published",
        )
    )

    if property_record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found or unavailable.",
        )

    lead = Lead(
        property_id=lead_data.property_id,
        lead_type=lead_data.lead_type,
        name=lead_data.name,
        phone=lead_data.phone,
        email=str(lead_data.email).lower(),
        message=lead_data.message,
        preferred_date=lead_data.preferred_date,
        consent=lead_data.consent,
        status="new",
        source="website",
    )

    try:
        database.add(lead)
        database.commit()
        database.refresh(lead)
    except SQLAlchemyError:
        database.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save the request. Please try again.",
        )

    return lead
