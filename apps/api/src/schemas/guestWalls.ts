import { t } from "elysia";

export const createGuestWallSchema = t.Object({
  slug: t.String({
    minLength: 1,
    maxLength: 64,
  }),

  title: t.String({
    minLength: 1,
    maxLength: 128,
  }),

  description: t.Optional(
    t.String({
      maxLength: 2048,
    }),
  ),

  requireApproval: t.Boolean(),
});
