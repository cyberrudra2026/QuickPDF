# QuickPDF Workspace

## Overview

QuickPDF is a modern, full-stack online PDF tools web application — similar to ilovepdf.com — allowing users to upload, process, and download PDF files easily and securely.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (Tailwind CSS, shadcn/ui, framer-motion, wouter, TanStack Query)
- **Backend**: Express 5 (Node.js)
- **Authentication**: Clerk (email/password + Google OAuth)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **PDF Processing**: pdf-lib (server-side merge, split, protect, unlock)
- **File Uploads**: multer (50MB limit, PDF-only validation)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

1. **Merge PDF** — Upload multiple PDFs, drag-and-drop reorder, merge into one
2. **Split PDF** — Split by page ranges or extract specific pages, download as ZIP
3. **Edit PDF** — Client-side PDF editing with canvas annotations
4. **Sign PDF** — Draw, type, or upload signature; place anywhere
5. **Protect PDF** — Add password, restrict printing/copying/editing
6. **Unlock PDF** — Remove password (correct password required)

## User System

- Clerk authentication: email + password, Google OAuth
- User dashboard: file history, stats by operation, recent files
- Files auto-deleted server-side after processing

## Artifacts

- `artifacts/quickpdf` — React/Vite frontend at `/`
- `artifacts/api-server` — Express API server at `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## API Routes

- `GET /api/healthz` — health check
- `GET /api/files` — list user file history (auth required)
- `GET /api/files/stats` — get processing stats (auth required)
- `DELETE /api/files/:id` — delete file record (auth required)
- `POST /api/pdf/merge` — merge PDFs (multipart, auth required)
- `POST /api/pdf/split` — split PDF (multipart, auth required)
- `POST /api/pdf/protect` — protect PDF (multipart, auth required)
- `POST /api/pdf/unlock` — unlock PDF (multipart, auth required)

## Database Schema

- `files` table — tracks all processed files per user (userId, operation, originalName, outputName, fileSizeBytes, status, createdAt)
