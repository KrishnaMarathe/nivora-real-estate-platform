"""create property image bucket

Revision ID: 7f9c2a11d005
Revises: 443e3b446be8
"""
from typing import Sequence, Union
from alembic import op

revision: str = "7f9c2a11d005"
down_revision: Union[str, Sequence[str], None] = "443e3b446be8"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("""
        insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
        values ('property-images', 'property-images', true, 8388608, array['image/jpeg','image/png','image/webp'])
        on conflict (id) do update set public = true, file_size_limit = 8388608,
          allowed_mime_types = array['image/jpeg','image/png','image/webp'];

        drop policy if exists "Public property image access" on storage.objects;
        create policy "Public property image access" on storage.objects for select
          using (bucket_id = 'property-images');

        drop policy if exists "Admins upload property images" on storage.objects;
        create policy "Admins upload property images" on storage.objects for insert to authenticated
          with check (bucket_id = 'property-images' and exists (
            select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'
          ));

        drop policy if exists "Admins update property images" on storage.objects;
        create policy "Admins update property images" on storage.objects for update to authenticated
          using (bucket_id = 'property-images' and exists (
            select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'
          ));

        drop policy if exists "Admins delete property images" on storage.objects;
        create policy "Admins delete property images" on storage.objects for delete to authenticated
          using (bucket_id = 'property-images' and exists (
            select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'
          ));
    """)


def downgrade() -> None:
    op.execute("""
        drop policy if exists "Admins delete property images" on storage.objects;
        drop policy if exists "Admins update property images" on storage.objects;
        drop policy if exists "Admins upload property images" on storage.objects;
        drop policy if exists "Public property image access" on storage.objects;
    """)
