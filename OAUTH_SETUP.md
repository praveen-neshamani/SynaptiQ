# OAuth Setup Instructions

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Click "Create Credentials" → "OAuth 2.0 Client ID"
4. Configure OAuth consent screen:
   - User Type: External
   - App name: SynaptiQ
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
5. Create OAuth Client ID:
   - Application type: Web application
   - Name: SynaptiQ Web
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-domain.com/api/auth/callback/google` (for production)
6. Copy Client ID and Client Secret
7. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

## GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - Application name: SynaptiQ
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy Client ID
6. Click "Generate a new client secret" and copy it
7. Add to `.env.local`:
   ```
   GITHUB_CLIENT_ID=your-client-id-here
   GITHUB_CLIENT_SECRET=your-client-secret-here
   ```

## Generate NextAuth Secret

Run this command in terminal:
```bash
openssl rand -base64 32
```

Add to `.env.local`:
```
NEXTAUTH_SECRET=generated-secret-here
```

## Final .env.local file should look like:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENROUTER_API_KEY=your-openrouter-api-key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-32-chars-min

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Test the Setup

1. Restart your Next.js dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click "Continue with Google" or "Continue with GitHub"
4. You should be redirected to OAuth provider
5. After authorization, you'll be redirected to `/dashboard`

## Troubleshooting

- **Error: "Redirect URI mismatch"**: Make sure the callback URL in OAuth settings matches exactly
- **Error: "Invalid client"**: Check that Client ID and Secret are correct in `.env.local`
- **Error: "NEXTAUTH_SECRET not set"**: Generate and add the secret to `.env.local`
