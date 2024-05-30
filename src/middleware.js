import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios-instance";

const protectedRoutes = ["/dashboard"];
const mainRoutes = ["/"];

export default async function middleware(req) {
  const sessionValue = req.cookies.get("session")?.value;
  const session = req.cookies.get("session");

  // Do something with the cookie value
  console.log("Cookie Value:", session);

  // Check if he "auth" cookie is present and has a specific value
  // const isAuthenticated = cookies["auth"] === "authenticated";
  const isAuthenticated = true;

  if (!sessionValue && isPathInProtectedRoutes(req.nextUrl.pathname)) {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 12);

    // Format the expiration date as a string in UTC format
    const expiresUTC = expirationDate.toUTCString();

    // Redirect to sign-in page
    // const absoluteURL = new URL("/users/sign-in", req.nextUrl.origin);
    // return NextResponse.redirect(absoluteURL.toString());
    // Delete the expired session cookie

    const res = NextResponse.redirect(
      new URL("/users/sign-in", req.nextUrl.origin)
    );
    res.cookies.set("session", "", {
      expires: new Date(expirationDate.getTime() + 6 * 60 * 60 * 1000),
    });
    return res;
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
