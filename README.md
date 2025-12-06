# EduPack Interface

This project is a Next.js interface that stores SCORM packages and user data in Supabase and uses OpenRouter/OpenAI for AI-assisted authoring.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```

3. Create a Supabase project and run [`build.sql`](./build.sql) in the SQL editor to provision the database tables, storage bucket, and RLS policies the app expects.

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Configuration

  - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required everywhere the app talks to Supabase (database, auth, and storage). Missing values will raise a clear error before a request is made.
  - The schema in `build.sql` defines the `users` and `packages` tables plus the `packages` storage bucket used by the API routes and UI. It exactly mirrors the SQL provided by the product team (users, packages, package_owners, billing, messages, and storage policies) so the app enforces the same RLS behavior the backend expects.

- **AI Providers**
  - Set `OPENROUTER_API_KEY` to call OpenRouter with the default model `allenai/olmo-3-32b-think:free` (override with `OPENROUTER_MODEL` if needed).
  - Optionally set `OPENAI_API_KEY` for OpenAI-based features; the default model is `gpt-5 Mini` (override with `OPENAI_MODEL`).

## Helpful Commands

- `npm run dev` — start the development server
- `npm run lint` — lint the codebase
- `npm run build` — create a production build
