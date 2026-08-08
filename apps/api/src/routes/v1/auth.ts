import { Elysia, status } from "elysia";
import {
  loginUser,
  registerUser,
  logoutUser,
  AuthError,
} from "../../services/auth";
import { loginSchema, registerSchema } from "../../schemas/auth";
import { SESSION_COOKIE_NAME } from "../../plugins/session";
import { authPlugin } from "../../plugins/auth";

const setSessionCookie = (
  cookie: Record<string, any>,
  session: { token: string; expiresAt: Date },
) => {
  cookie[SESSION_COOKIE_NAME].set({
    value: session.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  });
};

export const v1AuthRoutes = new Elysia({
  prefix: "/auth",
})
  .post(
    "/register",
    async ({ body, cookie }) => {
      try {
        const { session, user } = await registerUser(body);
        setSessionCookie(cookie, session);

        return status(201, { user });
      } catch (error) {
        if (error instanceof AuthError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { body: registerSchema },
  )

  .post(
    "/login",
    async ({ body, cookie }) => {
      try {
        const { session, user } = await loginUser(body);
        setSessionCookie(cookie, session);

        return status(200, { user });
      } catch (error) {
        if (error instanceof AuthError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { body: loginSchema },
  )

  .use(authPlugin)
  .post(
    "/logout",
    async ({ cookie }) => {
      const token = cookie[SESSION_COOKIE_NAME]?.value as string | undefined;

      if (token) {
        await logoutUser(token);
      }

      cookie[SESSION_COOKIE_NAME].remove();

      return status(200, { success: true });
    },
    { auth: true },
  );
