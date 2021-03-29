import { serve } from "https://deno.land/std@0.89.0/http/server.ts";

const rawPort = Deno.env.get("PORT");
const PORT = (rawPort === undefined) ? 8080 : parseInt(rawPort);

const server = serve({ hostname: "0.0.0.0", port: PORT });
console.log(
  `HTTP webserver running.  Access it at:  http://localhost:${PORT}/`,
);

for await (const request of server) {
  let bodyContent = "Red Hat TechClub server is running!\n\n";
  bodyContent += "Your user-agent is:\n\n";
  bodyContent += request.headers.get("user-agent") || "Unknown";

  request.respond({ status: 200, body: bodyContent });
}
