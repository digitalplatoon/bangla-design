# Developer Setup Guide - Bangla.design

## Quick Start

### 1. Prerequisites
- Node.js 14.x or higher
- Git
- A Neon PostgreSQL database (provided)

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
# Database connection
DATABASE_URL=<your-neon-connection-string>

# JWT Secret for session tokens (minimum 32 characters)
JWT_SECRET=your-dev-secret-key-min-32-chars-long
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

---

## Project Structure

```
bangla-design/
├── app/
│   ├── (auth)/                # Auth routes
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── builder/page.tsx
│   │   │   └── layout.tsx
│   ├── api/                   # API routes
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── logout/route.ts
│   │   └── ai/
│   │       └── generate/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # Shadcn/ui components
│   ├── dashboard/             # Dashboard components
│   ├── landing/               # Landing page sections
│   └── theme-provider.tsx
├── lib/
│   ├── auth.ts               # Authentication utilities
│   ├── utils.ts              # General utilities
│   └── ai/
│       └── builder.ts        # AI generation logic
├── db/
│   ├── schema.ts             # Database schema (Drizzle)
│   └── index.ts              # Database client
├── middleware.ts             # Next.js middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Key Features

### Authentication
- Email/password registration and login
- JWT-based session management
- HTTP-only secure cookies
- Auto-login after registration
- Protected routes via middleware

### AI Generation
- Support for multiple content types: website, section, component, content, image
- Integration with external AI service
- Prompt validation and error handling

### Dashboard
- User profile management
- AI website builder interface
- Site management and templates
- Subscription information

### Database
- PostgreSQL with Neon
- Drizzle ORM for type-safe queries
- Proper indexes for performance
- Foreign key relationships

---

## Common Development Tasks

### Adding a New API Route

1. Create new file in `app/api/yourroute/route.ts`
2. Implement GET/POST/PUT/DELETE handler
3. Add proper error handling and validation
4. Use `createSession()` for auth routes

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Your logic here
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Adding a New Component

1. Create component file in appropriate directory
2. Use TypeScript for proper typing
3. Import required UI components from `@/components/ui`
4. Test with different states

Example:
```typescript
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Click me</Button>
    </div>
  )
}
```

### Adding to Database

1. Update schema in `db/schema.ts`
2. Run `npm run db:push` to sync with database
3. Use Drizzle ORM in routes with proper types

Example:
```typescript
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Query
const user = await db.query.users.findFirst({
  where: eq(users.email, 'test@example.com')
})

// Insert
await db.insert(users).values({
  name: 'John Doe',
  email: 'john@example.com',
  password: hashedPassword,
})

// Update
await db.update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.id, userId))

// Delete
await db.delete(users).where(eq(users.id, userId))
```

---

## Styling Guidelines

### Colors
Primary Bangladesh colors are predefined:
- Green: `#006A4E` - `.bg-bangla-green`
- Red: `#F42A41` - `.bg-bangla-red`

### Typography
Available fonts via variable:
- Sans: `var(--font-inter)` (default)
- Serif: `var(--font-poppins)`
- Bengali: `var(--font-noto-bengali)`

### Tailwind CSS
Always use Tailwind classes:
```tsx
<div className="flex items-center justify-between gap-4 p-6">
  <h1 className="text-2xl font-bold text-bangla-green">Title</h1>
</div>
```

---

## Debugging

### Check Environment Variables
```bash
# These should all be set
echo $DATABASE_URL
echo $JWT_SECRET
```

### Enable Debug Logging
Add debug statements in code:
```typescript
console.log('[v0] Variable name:', variableName)
```

### Check Database
```bash
npm run db:studio  # Opens Drizzle Studio UI
```

### TypeScript Errors
```bash
npm run typecheck  # Find all type issues
```

---

## Performance Tips

1. **Images**: Always use `next/image` for optimization
2. **Fonts**: Use next/font for Google Fonts
3. **Database**: Use indexes on frequently queried columns
4. **Caching**: Consider adding React Query or SWR
5. **Code Splitting**: Next.js handles this automatically

---

## Deployment Checklist

Before deploying to production:

- [ ] All environment variables set
- [ ] Database backups configured
- [ ] JWT_SECRET is strong and random
- [ ] `npm run build` completes without errors
- [ ] `npm run typecheck` passes
- [ ] All tests pass (if applicable)
- [ ] Security headers verified
- [ ] API rate limiting configured
- [ ] Error logging configured

---

## Troubleshooting

### "Cannot find module" error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Database connection error
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection status
- Ensure IP is whitelisted in Neon

### JWT_SECRET warning
- Add strong JWT_SECRET to .env.local
- Minimum 32 characters recommended

### Styling issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind config for color definitions

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon Documentation](https://neon.tech/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## Getting Help

1. Check existing code for patterns
2. Review error messages carefully
3. Check console for detailed errors
4. Review AUDIT_REPORT.md and DEPLOYMENT.md
5. Check component/route source files for examples
