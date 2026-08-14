from sqlalchemy import select

from app.database import SessionLocal
from app.models import Property


SAMPLE_PROPERTIES = [
    ("sea-facing-residence-colaba", "Sea-facing heritage residence", "A gracious, light-filled sample residence near the waterfront with restored architectural details and contemporary finishes.", "buy", "house", 87_500_000, 3, 3, 1850, "Colaba", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", True),
    ("art-deco-apartment-marine-drive", "Art-deco apartment by the sea", "A spacious sample home overlooking Marine Drive with generous rooms and an elegant art-deco character.", "rent", "house", 285_000, 3, 3, 2100, "Marine Drive", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85", True),
    ("quiet-studio-fort", "Quiet studio near Kala Ghoda", "A renovated sample studio for city professionals, close to cafes, galleries and the business district.", "rent", "studio", 72_000, 1, 1, 510, "Fort", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85", True),
    ("skyline-office-nariman-point", "Skyline office at Nariman Point", "A sample plug-and-play office with a prestigious business address, panoramic views and flexible meeting spaces.", "rent", "commercial", 480_000, 0, 2, 2400, "Nariman Point", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85", False),
    ("classic-home-malabar-hill", "Classic home on Peddar Road", "A private sample family residence with green views and flexible living spaces in a landmark South Mumbai neighbourhood.", "buy", "house", 142_500_000, 4, 4, 2650, "Malabar Hill", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", False),
    ("modern-studio-lower-parel", "Modern studio in Lower Parel", "A contemporary sample urban studio with premium amenities and excellent access to Mumbai business districts.", "buy", "studio", 27_500_000, 1, 1, 780, "Lower Parel", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", False),
]


def seed_properties() -> None:
    with SessionLocal() as database:
        existing_slugs = set(database.scalars(select(Property.slug)).all())
        new_properties = []

        for item in SAMPLE_PROPERTIES:
            slug, title, description, purpose, property_type, price, bedrooms, bathrooms, area, locality, image_url, featured = item

            if slug in existing_slugs:
                continue

            new_properties.append(
                Property(
                    slug=slug,
                    title=title,
                    description=description,
                    purpose=purpose,
                    property_type=property_type,
                    status="published",
                    price=price,
                    bedrooms=bedrooms,
                    bathrooms=bathrooms,
                    area=area,
                    locality=locality,
                    city="Mumbai",
                    availability="Available for enquiries",
                    image_url=image_url,
                    featured=featured,
                    verified=True,
                )
            )

        database.add_all(new_properties)
        database.commit()
        print(f"Added {len(new_properties)} sample properties.")


if __name__ == "__main__":
    seed_properties()
