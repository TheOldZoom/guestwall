import { Elysia } from "elysia";
import { v1AuthRoutes } from "./routes/v1/auth";

export const app = new Elysia()
  .get("/health", () => ({ status: "ok" }))
  .group("/v1", (app) => app.use(v1AuthRoutes));
