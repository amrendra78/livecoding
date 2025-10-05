Deployment notes for Vercel

1. Environment variables (set in Vercel project settings):
   - API_URL (optional) - frontend will use this if provided
   - MONGO_URI - for MongoDB (if using the Express server)
   - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) - for Supabase functions
   - FRONTEND_URL - allowed origins for CORS (comma separated)

2. Build
   Vercel will run "npm run vercel-build" which runs "npm run build" (Angular production build).
   Ensure the project builds locally with:

   npm install
   npm run build

3. Serverless API
   - Files under `api/` are deployed as serverless functions on Vercel.
   - `api/server.js` exports an Express app and a serverless handler. Vercel will use the individual route files (login.ts, signup.ts) as functions.

4. Tips
   - If you use MongoDB from serverless functions, prefer a managed MongoDB with a stable connection string.
   - For local development, run the Express server (node api/server.js) and the frontend (ng serve) separately.
