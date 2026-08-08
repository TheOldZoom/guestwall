import { Elysia, status, t } from "elysia";
import { createEntry, getEntriesByGuestWallSlug } from "../../services/entries";
import { createEntrySchema } from "../../schemas/entries";
import { GuestWallError } from "../../services/guestWalls";

export const v1EntryRoutes = new Elysia({
  prefix: "/guestwalls/:slug",
})
  .get(
    "/entries",
    async ({ params, query }) => {
      const { slug } = params;

      return await getEntriesByGuestWallSlug(slug, query.cursor);
    },
    {
      query: t.Object({
        cursor: t.Optional(t.String()),
      }),
    },
  )
  .post(
    "/entries",
    async ({ params, body }) => {
      try {
        const entry = await createEntry(params.slug, body);

        return status(201, entry);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, {
            error: error.message,
          });
        }

        throw error;
      }
    },
    {
      body: createEntrySchema,
    },
  );
