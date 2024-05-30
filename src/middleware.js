import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios-instance";

const protectedRoutes = ["/dashboard"];
const mainRoutes = ["/"];

export default async function middleware(req) {
  const sessionCookie = req.cookies.get("session");
  const session = sessionCookie?.value;

  // Do something with the cookie value
  console.log("Cookie Value:", session);

  // Check if he "auth" cookie is present and has a specific value
  // const isAuthenticated = cookies["auth"] === "authenticated";
  const isAuthenticated = true;

  // if (!sessionValue && isPathInProtectedRoutes(req.nextUrl.pathname)) {
  //   // Redirect to sign-in page
  //   const absoluteURL = new URL("/users/sign-in", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  if (!session) {
    if (isPathInProtectedRoutes(req.nextUrl.pathname)) {
      const res = NextResponse.redirect(
        new URL("/users/sign-in", req.nextUrl.origin)
      );
      res.cookies.set("session", "", { expires: new Date(0) });
      return res;
    }
  } else {
    const sessionExpiryDate = new Date(sessionCookie.expires);
    const now = new Date();

    if (sessionExpiryDate < now) {
      const res = NextResponse.redirect(
        new URL("/users/sign-in", req.nextUrl.origin)
      );
      res.cookies.set("session", "", { expires: new Date(0) });
      return res;
    } else {
      // Extend the session cookie expiry by 12 hours
      const newExpiryDate = new Date(now.getTime() + 12 * 60 * 60 * 1000);
      const res = NextResponse.next();
      res.cookies.set("session", session, { expires: newExpiryDate });
      return res;
    }
  }
  // If user is authenticated and accessing main routes, redirect to dashboard
  if (isAuthenticated && mainRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

function isPathInProtectedRoutes(pathname) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}
