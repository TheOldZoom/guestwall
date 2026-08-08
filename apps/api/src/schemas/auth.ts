import { t } from "elysia";

const usernamePattern = /^[a-zA-Z0-9_-]+$/;
const displayNamePattern = /^[\p{L}\p{N} .,!?'’"-]+$/u;

export const registerSchema = t.Object({
  displayName: t.Optional(
    t.String({
      minLength: 3,
      maxLength: 64,
      pattern: displayNamePattern.source,
    }),
  ),

  username: t.String({
    minLength: 3,
    maxLength: 64,
    pattern: usernamePattern.source,
  }),

  email: t.String({
    format: "email",
  }),

  password: t.String({
    minLength: 8,
    maxLength: 64,
  }),
});

export const loginSchema = t.Object({
  email: t.String({
    format: "email",
  }),

  password: t.String({
    minLength: 8,
    maxLength: 64,
  }),
});
