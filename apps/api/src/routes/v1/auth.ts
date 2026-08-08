import { Elysia, status, t } from "elysia";
import { loginUser, registerUser } from "../../services/auth";
import { jwtPlugin } from "../../plugins/jwt";
import { loginSchema, registerSchema } from "../../schemas/auth";

export const v1AuthRoutes = new Elysia({
  prefix: "/auth",
})
  .use(jwtPlugin)
  .post(
    "/register",
    async ({ body, jwt }) => {
      const user = await registerUser(body, jwt.sign);

      return status(201, user);
    },
    {
      body: registerSchema,
    },
  )
  .post(
    "/login",
    async ({ body, jwt }) => {
      const user = await loginUser(body, jwt.sign);

      return status(201, user);
    },
    {
      body: loginSchema,
    },
  );
