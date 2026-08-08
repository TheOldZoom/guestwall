import { t } from "elysia";

export const createEntrySchema = t.Object({
  name: t.String({
    minLength: 1,
    maxLength: 64,
  }),

  content: t.String({
    minLength: 1,
    maxLength: 1024,
  }),

  website: t.Optional(
    t.String({
      format: "uri",
      maxLength: 256,
    }),
  ),
});

export const moderationQuerySchema = t.Object({
  cursor: t.Optional(t.String()),
  status: t.Optional(
    t.Union([
      t.Literal("PENDING"),
      t.Literal("APPROVED"),
      t.Literal("REJECTED"),
    ]),
  ),
});
