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

  if (!session && isPathInProtectedRoutes(req.nextUrl.pathname)) {
    // Redirect to sign-in page
    const absoluteURL = new URL("/users/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
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
