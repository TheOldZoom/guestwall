import { Elysia, status } from "elysia";
import { loginUser, registerUser, AuthError } from "../../services/auth";
import { jwtPlugin } from "../../plugins/jwt";
import { loginSchema, registerSchema } from "../../schemas/auth";

export const v1AuthRoutes = new Elysia({
  prefix: "/auth",
})
  .use(jwtPlugin)

  .post(
    "/register",
    async ({ body, jwt }) => {
      try {
        const user = await registerUser(body, jwt.sign);

        return status(201, user);
      } catch (error) {
        if (error instanceof AuthError) {
          return status(error.status, {
            error: error.message,
          });
        }

        throw error;
      }
    },
    {
      body: registerSchema,
    },
  )

  .post(
    "/login",
    async ({ body, jwt }) => {
      try {
        const user = await loginUser(body, jwt.sign);

        return status(200, user);
      } catch (error) {
        if (error instanceof AuthError) {
          return status(error.status, {
            error: error.message,
          });
        }

        throw error;
      }
    },
    {
      body: loginSchema,
    },
  );
