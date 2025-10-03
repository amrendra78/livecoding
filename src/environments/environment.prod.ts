export const environment = {
  production: true,
  // Use relative /api so frontend and Vercel Serverless Functions share the same domain
  // For this project the backend is hosted separately on Vercel at
  // https://livecoding-backend.vercel.app — point production API calls there.
  apiUrl: 'https://livecoding-backend.vercel.app/api'
};

