# 5Crest Realty

5Crest Realty is a full-stack real-estate discovery and advisory platform for buying and renting homes, studios, and commercial properties across South Bombay, Mumbai.

It is designed as a professional product concept with a public property website, authenticated customer accounts, owner property submissions, lead capture, and an administrator workspace for managing inventory and enquiries.

## Highlights

- Browse properties for sale or rent across South Bombay
- Filter listings by purpose, locality, property type, and price
- View detailed property information and submit enquiries or visit requests
- Create an account with Supabase Auth, email confirmation, and password reset
- Save favourite properties to an authenticated account
- Submit owner property introductions and contact messages
- Manage inventory, leads, owner submissions, and contact messages in an admin dashboard
- Upload property images securely to Supabase Storage
- Use PostgreSQL migrations for repeatable database setup

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, Alembic |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Image storage | Supabase Storage |

## Project structure

```text
RS-web/
├── frontend/            # Next.js application
│   ├── public/images/   # Website image assets
│   └── src/             # Pages, components, hooks, and API clients
├── backend/             # FastAPI application
│   ├── app/             # API routes, models, schemas, and authentication
│   └── migrations/      # Alembic database migrations
└── README.md
```

## Main features

### Public website

- Animated property-led landing page
- South Bombay locality guide
- Buy and rent property discovery
- Property detail, enquiry, and visit-request flows
- Contact and owner-listing forms
- Legal, privacy, disclaimer, and terms pages

### Customer accounts

- Email/password sign-up and sign-in
- Email confirmation and password reset
- Saved-property synchronisation for signed-in users

### Administrator workspace

- Inventory creation and publication controls
- Detailed property editing and image upload
- CRM lead status workflow: `new`, `contacted`, `qualified`, `closed`, `spam`
- Owner submission workflow: `new`, `reviewing`, `approved`, `rejected`
- Contact message workflow: `new`, `reviewed`, `closed`, `spam`
- Protected administrator-only API endpoints and dashboard routes

## Local development

### Requirements

- Node.js 20 or later
- Python 3.13
- A Supabase project with Auth, PostgreSQL, and Storage enabled

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

Create `frontend/.env.local` from the following template:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Backend

```powershell
cd backend
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m alembic upgrade head
python -m uvicorn app.main:app --reload --port 8001
```

The FastAPI documentation is available at `http://127.0.0.1:8001/docs`.

Create `backend/.env` from the following template:

```env
DATABASE_URL=your_supabase_postgresql_connection_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never commit `.env` files or database passwords. They are excluded by `.gitignore`.

### Run both applications

From the project root:

```powershell
npx --yes concurrently --kill-others --names BACKEND,FRONTEND "cd backend && .venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8001" "cd frontend && npm run dev"
```

## Verification

```powershell
cd frontend
npm run lint
npm run build
```

```powershell
cd backend
.\.venv\Scripts\python.exe -m alembic current
```

## Deployment notes

- Deploy `frontend` as a Next.js application.
- Deploy `backend` as a Python web service running Uvicorn.
- Set the frontend API URL to the deployed backend URL.
- Add deployed frontend and backend URLs to the FastAPI CORS configuration.
- Add the deployed frontend URL to Supabase Auth redirect URLs.
- Configure the same Supabase environment variables on both deployment services.

## Author

Created by **Krishna Bhupendra Marathe**.
