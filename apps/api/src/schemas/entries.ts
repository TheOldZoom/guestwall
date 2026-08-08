import { t } from "elysia";

export const createEntrySchema = t.Object({
  name: t.String({
    minLength: 1,
    maxLength: 50,
  }),

  content: t.String({
    minLength: 1,
    maxLength: 1000,
  }),

  website: t.Optional(
    t.String({
      format: "uri",
      maxLength: 256,
    }),
  ),
});
