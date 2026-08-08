import { Elysia, status } from "elysia";
import { createGuestWall, getGuestWallBySlug } from "../../services/guestWalls";
import { createGuestWallSchema } from "../../schemas/guestWalls";
import { authPlugin } from "../../plugins/auth";
import { rateLimitByKey } from "../../libs/rateLimit";

export const v1GuestWallRoutes = new Elysia({
  prefix: "/guestwalls",
})
  .use(authPlugin)
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
  );
