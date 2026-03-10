import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { db } from "@/db"
import { users, sessions } from "@/db/schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

export interface SessionUser {
  id: string
  email: string
  name: string
  role: string
}

export interface Session {
  user: SessionUser
}

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(JWT_SECRET)

  // Store session in database
  await db.insert(sessions).values({
    userId,
    sessionToken: token,
    expires: expiresAt,
  })

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  })

  return token
}

export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    // Verify session exists in database
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.sessionToken, token),
    })

    if (!session || session.expires < new Date()) {
      return null
    }

    // Get user
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      return null
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (token) {
    // Delete session from database
    await db.delete(sessions).where(eq(sessions.sessionToken, token))
    
    // Clear cookie
    cookieStore.delete("session")
  }
}
