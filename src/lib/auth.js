import { cookies } from "next/headers";

export async function login(user) {
  // Verify credentials && get the user

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}
