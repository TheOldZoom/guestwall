import { Elysia, status, t } from "elysia";
import {
  createGuestWall,
  getGuestWallBySlug,
  getGuestWallsByOwner,
  updateGuestWall,
  deleteGuestWall,
} from "../../services/guestWalls";
import {
  createGuestWallSchema,
  updateGuestWallSchema,
} from "../../schemas/guestWalls";
import { authPlugin } from "../../plugins/auth";
import { rateLimitByKey } from "../../libs/rateLimit";

export const v1GuestWallRoutes = new Elysia({
  prefix: "/guestwalls",
})
  .use(authPlugin)
  .get(
    "/",
    async ({ query, user }) => {
      return await getGuestWallsByOwner(user.id, query.cursor);
    },
    { auth: true, query: t.Object({ cursor: t.Optional(t.String()) }) },
  )
  .get("/:slug", async ({ params }) => {
    return await getGuestWallBySlug(params.slug);
  })
  .post(
    "/",
    async ({ body, user }) => {
      const existingWall = await getGuestWallBySlug(body.slug).catch(
        () => null,
      );

      if (existingWall) {
        return status(409, {
          error: "GuestWall already exists",
        });
      }

      const rateLimitResponse = rateLimitByKey("guestwall-create", user.id, {
        windowMs: 60 * 60 * 1000,
        max: 1,
      });

      if (rateLimitResponse) {
        return rateLimitResponse;
      }

      const wall = await createGuestWall(body, user.id);

      return status(201, wall);
    },
    {
      auth: true,
      body: createGuestWallSchema,
    },
  )
  .patch(
    "/:slug",
    async ({ params, body, user }) => {
      return await updateGuestWall(params.slug, body, user.id);
    },
    { auth: true, body: updateGuestWallSchema },
  )
  .delete(
    "/:slug",
    async ({ params, user }) => {
      await deleteGuestWall(params.slug, user.id);
      return status(200, { success: true });
    },
    { auth: true },
  );
