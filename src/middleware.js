import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios-instance";

const protectedRoutes = ["/dashboard"];
const mainRoutes = ["/"];

export default async function middleware(req) {
  const session = req.cookies.get("session")?.value;

  // Do something with the cookie value
  console.log("Cookie Value:", session);

  // Check if the "auth" cookie is present and has a specific value
  // const isAuthenticated = cookies["auth"] === "authenticated";
  const isAuthenticated = true;
  console.log(isAuthenticated);

  // User is authenticated
  if (mainRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to sign-in page for protected routes
    const absoluteURL = new URL("/users/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
