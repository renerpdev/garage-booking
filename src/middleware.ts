import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { locales, localePrefix, defaultLocale } from "./intl.config"

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
})

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: [
    "/",
    "/:locale",
    "/manifest(.*)",
    "/api/webhooks(.*)",
    "/api/bookings/active(.*)",
    "/api/notifications/subscribe(.*)",
    "/.well-known/vercel/flags"
  ],
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req)
  },
  afterAuth(auth, req, _evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }
    // Allow users visiting public routes to access them
    return NextResponse.next()
  }
})

export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: ["/(es|en)/((?!.+\\.[\\w]+$|_next).*)", "/(es|en)?", "/(es|en)/(api|trpc)(.*)"]
}
