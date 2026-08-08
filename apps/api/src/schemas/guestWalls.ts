import { t } from "elysia";

const slugPattern = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const titlePattern = /^[a-zA-Z0-9 .,!?'’"()-]+$/;

export const createGuestWallSchema = t.Object({
  slug: t.String({
    minLength: 1,
    maxLength: 64,
    pattern: slugPattern.source,
  }),

  title: t.String({
    minLength: 1,
    maxLength: 100,
    pattern: titlePattern.source,
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
      pattern: titlePattern.source,
    }),
  ),

  description: t.Optional(
    t.String({
      maxLength: 2048,
    }),
  ),

  requireApproval: t.Optional(t.Boolean()),
});
