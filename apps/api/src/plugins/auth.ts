import { Elysia, status } from "elysia";
import { prisma } from "../libs/prisma";
import { SESSION_COOKIE_NAME } from "./session";

export const authPlugin = new Elysia({
  name: "auth",
}).macro({
  auth: {
    async resolve({ cookie }) {
      const token = cookie[SESSION_COOKIE_NAME]?.value as string | undefined;

      if (!token) {
        return status(401, {
          error: "Authentication required",
        });
      }

      const session = await prisma.session.findUnique({
        where: { token },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              email: true,
            },
          },
        },
      });

      if (!session || session.expiresAt < new Date()) {
        if (session) {
          await prisma.session.delete({ where: { token } });
        }
        return status(401, {
          error: "Invalid or expired session",
        });
      }
      return {
        user: session.user,
      };
    },
  },
});
