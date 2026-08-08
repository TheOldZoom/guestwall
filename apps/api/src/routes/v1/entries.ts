import { Elysia, status, t } from "elysia";
import {
  createEntry,
  getEntriesByGuestWallSlug,
  getEntriesForModeration,
  approveEntry,
  rejectEntry,
  pinEntry,
  unpinEntry,
  deleteEntry,
} from "../../services/entries";
import {
  createEntrySchema,
  moderationQuerySchema,
} from "../../schemas/entries";
import { GuestWallError } from "../../services/guestWalls";
import { authPlugin } from "../../plugins/auth";

export const v1EntryRoutes = new Elysia({
  prefix: "/guestwalls/:slug",
})
  .get(
    "/entries",
    async ({ params, query }) => {
      return await getEntriesByGuestWallSlug(params.slug, query.cursor);
    },
    { query: t.Object({ cursor: t.Optional(t.String()) }) },
  )
  .post(
    "/entries",
    async ({ params, body }) => {
      try {
        const entry = await createEntry(params.slug, body);
        return status(201, entry);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { body: createEntrySchema },
  )

  .use(authPlugin)
  .get(
    "/entries/moderation",
    async ({ params, query, user }) => {
      try {
        return await getEntriesForModeration(params.slug, user.id, query);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true, query: moderationQuerySchema },
  )
  .patch(
    "/entries/:entryId/approve",
    async ({ params, user }) => {
      try {
        return await approveEntry(params.slug, params.entryId, user.id);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/reject",
    async ({ params, user }) => {
      try {
        return await rejectEntry(params.slug, params.entryId, user.id);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/pin",
    async ({ params, user }) => {
      try {
        return await pinEntry(params.slug, params.entryId, user.id);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/unpin",
    async ({ params, user }) => {
      try {
        return await unpinEntry(params.slug, params.entryId, user.id);
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true },
  )
  .delete(
    "/entries/:entryId",
    async ({ params, user }) => {
      try {
        await deleteEntry(params.slug, params.entryId, user.id);
        return status(200, { success: true });
      } catch (error) {
        if (error instanceof GuestWallError) {
          return status(error.status, { error: error.message });
        }
        throw error;
      }
    },
    { auth: true },
  );
