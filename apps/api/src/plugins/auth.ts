import { Elysia, status } from "elysia";
import { jwtPlugin } from "./jwt";
import { prisma } from "../libs/prisma";

export const authPlugin = new Elysia({
  name: "auth",
})
  .use(jwtPlugin)
  .macro({
    auth: {
      async resolve({ jwt, headers }) {
        const authorization = headers.authorization;

        if (!authorization?.startsWith("Bearer ")) {
          return status(401, {
            error: "Authentication required",
          });
        }

        const token = authorization.slice(7);
        const payload = await jwt.verify(token);

        if (!payload || typeof payload.sub !== "string") {
          return status(401, {
            error: "Invalid or expired token",
          });
        }

        const user = await prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true,
          },
        });

        if (!user) {
          return status(401, {
            error: "Account not found",
          });
        }

        return {
          user,
        };
      },
    },
  });
