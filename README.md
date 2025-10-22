# 📄 Resume BuilderThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern, professional resume builder application built with Next.js 15, Supabase, and Prisma. Create, customize, and download beautiful resumes in minutes.## Getting Started

## ✨ FeaturesFirst, run the development server:

- 🔐 **Secure Authentication** - Email/Password + Google OAuth```bash

- 📧 **Email Verification** - Secure account verification flownpm run dev

- 🎨 **Beautiful UI** - Modern design with smooth animations# or

- 📱 **Responsive** - Works perfectly on all devicesyarn dev

- 🗄️ **Database Integration** - PostgreSQL via Supabase + Prisma# or

- 🔒 **Protected Routes** - Automatic authentication middlewarepnpm dev

# or

## 🚀 Quick Startbun dev

````

### 1. Install Dependencies

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash

npm installYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

````

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### 2. Environment Setup

## Learn More

Create a `.env` file in the root directory (use `.env.example` as template):

To learn more about Next.js, take a look at the following resources:

````env

# Supabase Configuration- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Database

DATABASE_URL="your-postgresql-connection-string"## Deploy on Vercel



# App ConfigurationThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

NEXT_PUBLIC_APP_URL="http://localhost:3001"

```Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
````

### 4. Configure Supabase

1. **Go to your Supabase Dashboard** → Authentication → Providers
2. **Enable Email Provider** (if using email/password auth)
3. **Enable Google Provider** (if using OAuth):
   - Add your Google Client ID and Secret
4. **Set URL Configuration**:
   - Site URL: `http://localhost:3001`
   - Redirect URLs: `http://localhost:3001/**`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see your app.

## 📁 Project Structure

```
resume-builder/
├── src/app/                      # Next.js App Directory
│   ├── page.tsx                  # Homepage
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── dashboard/page.tsx        # User dashboard
│   └── auth/callback/route.ts    # OAuth callback handler
├── lib/                          # Utility libraries
│   ├── supabase.ts              # Client-side Supabase
│   ├── supabase-server.ts       # Server-side Supabase
│   └── prisma.ts                # Prisma client
├── prisma/                       # Database
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Migration files
├── middleware.ts                 # Route protection
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

## 🔐 Authentication Flow

### Sign Up

1. User visits `/signup`
2. Fills in registration form (name, email, password)
3. System sends verification email
4. User clicks verification link in email
5. Redirects to home page

### Login

1. User visits `/login`
2. Enters credentials
3. System verifies email is confirmed
4. Redirects to home page on success

### Google OAuth

1. User clicks "Continue with Google"
2. Redirects to Google authentication
3. After approval, redirects to `/auth/callback`
4. User data synced to database
5. Redirects to home page

## 🗄️ Database Schema

### Users Table

```prisma
model User {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String?
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  resumes    Resume[]
}
```

### Resumes Table

```prisma
model Resume {
  id         String   @id @default(uuid())
  user_id    String?
  title      String?
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  user       User?    @relation(fields: [user_id], references: [id])
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations
```

## 🎨 Key Features Implementation

### Email Verification

- Beautiful verification screen after signup
- Clear instructions for users
- Automatic email sending via Supabase
- Prevents login until email verified

### Route Protection

- Middleware automatically protects authenticated routes
- Redirects unauthenticated users to login
- Prevents logged-in users from accessing login/signup

### Error Handling

- User-friendly error messages
- Loading states on all async operations
- Graceful fallbacks

## 🔧 Configuration

### Environment Variables

All environment variables should be prefixed with:

- `NEXT_PUBLIC_` for client-side variables
- No prefix for server-only variables

### Middleware Configuration

Protected routes defined in `middleware.ts`:

- `/dashboard` - Requires authentication
- `/resume/*` - Requires authentication (future routes)

Public routes:

- `/` - Homepage
- `/login` - Login page
- `/signup` - Signup page

## 🐛 Troubleshooting

### "Module not found" errors

- Ensure all dependencies are installed: `npm install`
- Check import paths are correct

### "Supabase URL undefined"

- Verify `.env` file exists and contains correct values
- Restart dev server after changing `.env`

### Database connection issues

- Check `DATABASE_URL` is correct
- Ensure database is accessible
- Run `npx prisma generate` to sync schema

### Email verification not working

- Check Supabase email templates are configured
- Verify SMTP settings in Supabase dashboard
- Check spam folder for verification emails

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

**Built with ❤️ using Next.js and Supabase**
