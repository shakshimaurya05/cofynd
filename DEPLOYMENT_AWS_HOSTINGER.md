# Deployment Guide (AWS Backend + Hostinger Frontend)

## 1) Backend (AWS)

Deploy the `backend` app on AWS EC2/Elastic Beanstalk/ECS and expose it on:

- `https://api.coworkspaze.com`

Recommended runtime:

- Node.js `20.x`

Backend env vars (`backend/.env.example`):

- `PORT=5000`
- `MONGODB_URL=...`
- `ALLOWED_ORIGINS=https://coworkspaze.com,https://www.coworkspaze.com`
- `TRUST_PROXY=1`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`
- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=info@coworkspaze.com`
- `SMTP_PASS=...`
- `MAIL_FROM=CoworkSpaze <info@coworkspaze.com>`
- `ADMIN_EMAIL=...`
- `NODE_ENV=production`

Health check endpoint:

- `GET /api/health` (returns 200)

Run command:

- `node src/server.js`

## 2) Frontend (Hostinger)

Deploy the `c-frontend/build` output to Hostinger public web root.

Build-time env vars:

- `REACT_APP_API_URL=https://api.coworkspaze.com/api`

Build command:

- `npm run build`

Important:

- `c-frontend/public/.htaccess` has been added for SPA rewrite fallback.
- This is required so deep links like `/space/:id`, `/coworking/:city`, `/virtual-office/:city` work after refresh/direct open.

## 3) DNS + SSL

- Point `coworkspaze.com` and `www.coworkspaze.com` to Hostinger frontend hosting.
- Point `api.coworkspaze.com` to AWS backend load balancer/server.
- Ensure valid SSL certificates on both frontend and API domains.

## 4) Final Smoke Tests

- Open `https://coworkspaze.com` and `https://www.coworkspaze.com`.
- Directly open:
  - `/space/<valid-id>`
  - `/coworking/gurgaon`
  - `/virtual-office/gurgaon`
- Submit:
  - Lead form
  - Quote form
  - Virtual office form
- Verify:
  - API responses are 2xx
  - records saved in MongoDB
  - emails sent via SMTP
