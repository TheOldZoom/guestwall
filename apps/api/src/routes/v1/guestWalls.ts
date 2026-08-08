import { Elysia, status } from "elysia";
import {
  createGuestWall,
  getGuestWallBySlug,
  GuestWallError,
} from "../../services/guestWalls";
import { createGuestWallSchema } from "../../schemas/guestWalls";
import { authPlugin } from "../../plugins/auth";

export const v1GuestWallRoutes = new Elysia({
  prefix: "/guestwalls",
})
  .use(authPlugin)
  .get("/:slug", async ({ params }) => {
    const { slug } = params;

    try {
      const wall = await getGuestWallBySlug(slug);
      return wall;
    } catch (error) {
      if (error instanceof GuestWallError) {
        return status(error.status, {
          error: error.message,
        });
      }

      throw error;
    }
  })
  .post(
    "/",
    async ({ body, user }) => {
      try {
        const wall = await createGuestWall(body, user.id);
        return status(201, wall);
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
      auth: true,
      body: createGuestWallSchema,
    },
  );
