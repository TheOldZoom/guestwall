import { Elysia, status } from "elysia";
import { v1AuthRoutes } from "./routes/v1/auth";
import { v1GuestWallRoutes } from "./routes/v1/guestWalls";
import { prisma } from "./libs/prisma";
import { v1EntryRoutes } from "./routes/v1/entries";
import { AppError } from "./libs/errors";
import { getClientIp } from "./libs/net";
import { rateLimit } from "./libs/rateLimit";

const requestTimes = new WeakMap<Request, number>();
const requestIds = new WeakMap<Request, string>();

export const app = new Elysia()
  .onRequest(({ request, set }) => {
    const requestId = crypto.randomUUID();

    requestTimes.set(request, performance.now());
    requestIds.set(request, requestId);

    set.headers["X-Request-ID"] = requestId;

    const url = new URL(request.url);
    const ip = getClientIp(request);

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

  .onBeforeHandle(rateLimit("global", { windowMs: 5 * 60 * 1000, max: 300 }))

  .onError(({ code, error, set, request }) => {
    if (code === "VALIDATION") {
      set.status = 422;
      return {
        error: "Validation failed",
        fields: error.all.map((fieldError) => ({
          field: fieldError.path.replace("/", ""),
          message: fieldError.message,
        })),
      };
    }

    if (error instanceof AppError) {
      set.status = error.status;
      return { error: error.message };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return { error: "Not found" };
    }

    if (code === "PARSE") {
      set.status = 400;
      return { error: "Malformed request body" };
    }

    const url = new URL(request.url);
    console.error(
      `Unhandled error on ${request.method} ${url.pathname}:`,
      error,
    );

    set.status = 500;
    return { error: "Internal server error" };
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
