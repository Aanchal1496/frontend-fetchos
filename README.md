# FestOS — Aarohan 2026

Responsive festival homepage and organizer authentication frontend. This repository originally contained only a README; there was no pre-existing framework or backend. Built with vanilla JavaScript and Vite.

## Run

Requires Node 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Production hosting must rewrite frontend routes (`/about`, `/events`, `/contact`, `/auth`, `/profile`) to `index.html`, excluding assets and `/api`.

## Required artwork

Copy the user's exact supplied background JPEG to `public/images/aarohan-streetscape.jpeg`. The CSS uses cover positioning and the same artwork on authentication. The Windows Downloads path supplied in chat is not accessible from the cloud machine. Until uploaded, the page displays its terracotta base color; no replacement illustration has been supplied.

## Authentication integration

No fake users or sessions are stored. Forms call a real backend; until one is connected they display a service-unavailable message. Use same-origin `/api` by default, or set `VITE_API_BASE_URL` at build time (public configuration, never a secret).

Required JSON endpoints:

- `POST /api/auth/login`: `{identifier, password}`; establishes secure HttpOnly session cookie.
- `POST /api/auth/register`: `{fullName, email, college, studentId, password}`; creates account, with backend-controlled verification and role assignment.
- `POST /api/auth/forgot-password`: `{email}`; returns a generic response and sends a secure reset link. The backend must supply the reset destination and completion flow.
- `GET /api/auth/me`: `{user: {fullName, email, college, role}}`; return 401 for no session.

Successful endpoints return JSON. Errors use non-2xx status and `{message}`. Cross-origin deployments require credentialed CORS with an explicit origin and compatible cookie settings. Backend must implement validation, password hashing, authorization, rate limiting and CSRF protection appropriate to its session design. Do not return private data before authorization. Frontend validation is only for user feedback.

Events and verified contact details were not supplied: their routes show explicit unpublished states rather than invented listings or contact information. Operational modules are outside this implementation.
