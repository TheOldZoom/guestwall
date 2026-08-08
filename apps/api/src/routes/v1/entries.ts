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
import { authPlugin } from "../../plugins/auth";
import { rateLimit } from "../../libs/rateLimit";
import { getClientIp } from "../../libs/net";

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
    async ({ params, body, request }) => {
      const entry = await createEntry(params.slug, body, getClientIp(request));

      return status(201, entry);
    },
    {
      body: createEntrySchema,
      beforeHandle: [
        rateLimit("entry-create", { windowMs: 10 * 60 * 1000, max: 5 }),
      ],
    },
  )

  .use(authPlugin)
  .get(
    "/entries/moderation",
    async ({ params, query, user }) => {
      return await getEntriesForModeration(params.slug, user.id, query);
    },
    { auth: true, query: moderationQuerySchema },
  )
  .patch(
    "/entries/:entryId/approve",
    async ({ params, user }) => {
      return await approveEntry(params.slug, params.entryId, user.id);
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/reject",
    async ({ params, user }) => {
      return await rejectEntry(params.slug, params.entryId, user.id);
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/pin",
    async ({ params, user }) => {
      return await pinEntry(params.slug, params.entryId, user.id);
    },
    { auth: true },
  )
  .patch(
    "/entries/:entryId/unpin",
    async ({ params, user }) => {
      return await unpinEntry(params.slug, params.entryId, user.id);
    },
    { auth: true },
  )
  .delete(
    "/entries/:entryId",
    async ({ params, user }) => {
      await deleteEntry(params.slug, params.entryId, user.id);
      return status(200, { success: true });
    },
    { auth: true },
  );
