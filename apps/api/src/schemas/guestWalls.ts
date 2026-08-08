import { t } from "elysia";

export const createGuestWallSchema = t.Object({
  slug: t.String({
    minLength: 1,
    maxLength: 64,
  }),

  title: t.String({
    minLength: 1,
    maxLength: 100,
  }),

  description: t.Optional(
    t.String({
      maxLength: 2048,
    }),
  ),

  requireApproval: t.Boolean(),
});

export const updateGuestWallSchema = t.Object({
  title: t.Optional(
    t.String({
      minLength: 1,
      maxLength: 100,
    }),
  ),

  description: t.Optional(
    t.String({
      maxLength: 2048,
    }),
  ),

  requireApproval: t.Optional(t.Boolean()),
});
