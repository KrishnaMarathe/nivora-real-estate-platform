import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.auth import AuthenticatedUser, get_current_user
from app.database import get_database_session
from app.models import Property, SavedProperty
from app.schemas import PropertyResponse

router = APIRouter(prefix="/saved", tags=["Saved properties"])
@router.get("", response_model=list[PropertyResponse])
def list_saved(current_user: Annotated[AuthenticatedUser, Depends(get_current_user)], database: Annotated[Session, Depends(get_database_session)]) -> list[Property]:
    return list(database.scalars(select(Property).join(SavedProperty, SavedProperty.property_id == Property.id).where(SavedProperty.user_id == current_user.id, Property.status == "published").order_by(SavedProperty.created_at.desc())).all())


@router.put("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def save_property(property_id: uuid.UUID, current_user: Annotated[AuthenticatedUser, Depends(get_current_user)], database: Annotated[Session, Depends(get_database_session)]) -> None:
    if database.scalar(select(Property.id).where(Property.id == property_id, Property.status == "published")) is None:
        raise HTTPException(status_code=404, detail="Property not found.")
    if database.get(SavedProperty, (current_user.id, property_id)) is None:
        database.add(SavedProperty(user_id=current_user.id, property_id=property_id))
        database.commit()


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def unsave_property(property_id: uuid.UUID, current_user: Annotated[AuthenticatedUser, Depends(get_current_user)], database: Annotated[Session, Depends(get_database_session)]) -> None:
    database.execute(delete(SavedProperty).where(SavedProperty.user_id == current_user.id, SavedProperty.property_id == property_id))
    database.commit()
