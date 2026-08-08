import { app } from "./app";

app.listen(process.env.PORT || 3000);

console.log(
  `GuestWall is running at ${app.server?.hostname}:${app.server?.port}`,
);
