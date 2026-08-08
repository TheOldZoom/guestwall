import { Elysia, status } from "elysia";
import { v1AuthRoutes } from "./routes/v1/auth";
import { v1GuestWallRoutes } from "./routes/v1/guestWalls";
import { prisma } from "./libs/prisma";
import { v1EntryRoutes } from "./routes/v1/entries";

const requestTimes = new WeakMap<Request, number>();
const requestIds = new WeakMap<Request, string>();

export const app = new Elysia()
  .onRequest(({ request, set }) => {
    const requestId = crypto.randomUUID();

    requestTimes.set(request, performance.now());
    requestIds.set(request, requestId);

    set.headers["X-Request-ID"] = requestId;

    const url = new URL(request.url);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    console.log(`→ ${request.method} ${url.pathname} [${requestId}] [${ip}]`);
  })

  .onAfterResponse(({ request, set }) => {
    const start = requestTimes.get(request);
    const requestId = requestIds.get(request);

    const duration = start ? Math.round(performance.now() - start) : 0;

    const url = new URL(request.url);

    console.log(
      `← ${request.method} ${url.pathname} ${set.status} ${duration}ms [${requestId}]`,
    );

    requestTimes.delete(request);
    requestIds.delete(request);
  })

  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      return {
        error: "Validation failed",
        fields: error.all.map((error) => ({
          field: error.path.replace("/", ""),
          message: error.message,
        })),
      };
    }
  })

  .get("/health", async () => {
    const startedAt = Date.now();

    try {
      await prisma.$queryRaw`SELECT 1`;

      return {
        status: "ok",
        database: "ok",
        uptime: process.uptime(),
        responseTime: `${Date.now() - startedAt}ms`,
        timestamp: new Date().toISOString(),
      };
    } catch {
      return status(503, {
        status: "not ok",
        database: "error",
        uptime: process.uptime(),
        responseTime: `${Date.now() - startedAt}ms`,
        timestamp: new Date().toISOString(),
      });
    }
  })

  .group("/v1", (app) =>
    app.use(v1AuthRoutes).use(v1GuestWallRoutes).use(v1EntryRoutes),
  );
