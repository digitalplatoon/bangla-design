# Bangla.design - Deployment Guide

## Pre-Deployment Checklist

### Environment Variables Required
- `DATABASE_URL` - Neon PostgreSQL connection string (already configured)
- `JWT_SECRET` - Secret key for JWT token signing (MUST be set in production)

### Database Verification
- [x] Database schema created and verified with Neon
- [x] Tables: users, plans, subscriptions, payments, templates, sites, pages, ai_generations, sessions
- [x] All indexes created for optimal query performance

### Code Quality Checks
- [x] All TypeScript types properly defined
- [x] No console.log statements in production code (only console.error for errors)
- [x] All components use proper error boundaries
- [x] Environment variables validated with warnings for missing JWT_SECRET
- [x] Security headers configured in middleware and vercel.json

### Build & Performance
- [x] next.config.js optimized with image handling and security headers
- [x] tailwind.config.ts includes Bangladesh-specific colors and fonts
- [x] PostCSS configured for optimal CSS processing
- [x] All dependencies pinned to compatible versions

### Authentication & Security
- [x] JWT-based session management with bcrypt password hashing
- [x] Session tokens stored in HTTP-only cookies and database
- [x] Middleware protects dashboard and admin routes
- [x] Public routes accessible without authentication
- [x] Auto-login after registration enabled
- [x] Logout clears both cookie and database session

### API Routes
- [x] POST /api/auth/login - User login with email/password
- [x] POST /api/auth/register - User registration with auto-login
- [x] POST /api/auth/logout - User logout with cleanup
- [x] POST /api/ai/generate - AI content generation
- [x] Proper error handling and validation in all routes

### Landing Page & Dashboard
- [x] Hero section with CTA buttons
- [x] Features section highlighting Bangladesh-specific support
- [x] Pricing section with 3 plans (Free, Pro, Business)
- [x] Templates section with popular templates
- [x] Dashboard with sidebar navigation
- [x] AI Builder page with template selection
- [x] User profile dropdown with logout

### Styling & Theme
- [x] Tailwind CSS properly configured
- [x] Dark mode support with next-themes
- [x] Bangladesh colors: #006A4E (green) and #F42A41 (red)
- [x] bKash pink and Nagad orange colors included
- [x] Bengali fonts (Noto Sans Bengali) loaded via Google Fonts
- [x] Responsive design mobile-first approach

## Deployment Steps

### 1. Set Environment Variables on Vercel
```bash
# In Vercel Project Settings > Environment Variables
JWT_SECRET=<your-secure-random-string>
DATABASE_URL=<existing-neon-connection-string>
```

### 2. Deploy to Vercel
```bash
# Using Vercel CLI
vercel deploy

# Or click "Publish" in v0 interface
```

### 3. Verify Post-Deployment
- Test landing page at `/`
- Test login at `/login`
- Test registration at `/register`
- Test dashboard at `/dashboard` (requires login)
- Test AI builder at `/dashboard/builder` (requires login)
- Check console for any warnings about missing JWT_SECRET

### 4. Database Setup
Database tables are pre-created in Neon. No migrations needed.
- Verify tables exist: users, plans, subscriptions, payments, templates, sites, pages, ai_generations, sessions
- Check indexes are created for performance

## Production Checklist

Before going live:

1. **JWT_SECRET**: Must be a strong, random string (32+ characters)
   ```bash
   # Generate secure JWT_SECRET
   openssl rand -base64 32
   ```

2. **Database**: Verify Neon connection is in production mode

3. **Build Test**: Run `npm run build` locally to verify no errors
   ```bash
   cd /vercel/share/v0-project
   npm run build
   ```

4. **Type Check**: Run TypeScript compiler
   ```bash
   npm run typecheck
   ```

5. **Preview**: Test preview deployment on Vercel

## Troubleshooting

### JWT_SECRET Warning
If you see "JWT_SECRET environment variable is not set" warning:
- Add JWT_SECRET to Vercel environment variables
- Redeploy the application

### Database Connection Issues
- Verify DATABASE_URL in Vercel environment variables
- Check Neon dashboard for connection status
- Ensure connection string uses `@` for password special characters

### Build Failures
- Clear `.next` folder and rebuild
- Verify Node.js version compatibility (14.x or higher)
- Check for TypeScript errors: `npm run typecheck`

### Login Issues
- Clear browser cookies
- Verify JWT_SECRET is set consistently
- Check database sessions table for valid tokens

## Performance Optimization

Already implemented:
- Image optimization via next/image
- API route max duration: 30 seconds
- Caching headers for static assets
- Middleware for security headers
- Database indexes on foreign keys

## Security Features

- ✅ HTTPS enforced via Vercel
- ✅ HTTP-only cookies for session tokens
- ✅ CSRF protection via secure cookie settings
- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ SQL injection prevention with parameterized queries
- ✅ Rate limiting headers on API routes
- ✅ Content Security Policy headers
- ✅ X-Frame-Options, X-Content-Type-Options headers

## Monitoring

Monitor these metrics after deployment:
- Build time (should be < 60 seconds)
- API response times (target: < 500ms)
- Database connection pool usage
- Error logs in Vercel dashboard
- User authentication failures
