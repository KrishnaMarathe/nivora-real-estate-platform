from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_database_session
from app.models import ContactMessage, OwnerSubmission
from app.schemas import ContactMessageCreate, OwnerSubmissionCreate

router = APIRouter(prefix="/submissions", tags=["Submissions"])
@router.post("/contact", status_code=status.HTTP_201_CREATED)
def create_contact_message(data: ContactMessageCreate, database: Annotated[Session, Depends(get_database_session)]) -> dict[str, str]:
    record = ContactMessage(**data.model_dump(), status="new")
    database.add(record)
    database.commit()
    database.refresh(record)
    return {"id": str(record.id), "status": record.status}


@router.post("/owner-property", status_code=status.HTTP_201_CREATED)
def create_owner_submission(data: OwnerSubmissionCreate, database: Annotated[Session, Depends(get_database_session)]) -> dict[str, str]:
    record = OwnerSubmission(**data.model_dump(), status="new")
    database.add(record)
    database.commit()
    database.refresh(record)
    return {"id": str(record.id), "status": record.status}
