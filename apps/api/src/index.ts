import { app } from "./app";

app.listen(process.env.PORT || 3000);

console.log(
  `GuestWall is running at ${app.server?.hostname}:${app.server?.port}`,
);

console.log("\nRegistered routes:");

for (const route of app.routes) {
  console.log(`${route.method.padEnd(7)} ${route.path}`);
}
