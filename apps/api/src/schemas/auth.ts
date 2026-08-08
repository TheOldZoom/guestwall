import { t } from "elysia";

export const registerSchema = t.Object({
  displayName: t.Optional(
    t.String({
      minLength: 3,
      maxLength: 50,
    }),
  ),

  username: t.String({
    minLength: 3,
    maxLength: 50,
  }),

  email: t.String({
    format: "email",
  }),

  password: t.String({
    minLength: 8,
    maxLength: 100,
  }),
});

export const loginSchema = t.Object({
  email: t.String({
    format: "email",
  }),

  password: t.String({
    minLength: 8,
    maxLength: 100,
  }),
});
