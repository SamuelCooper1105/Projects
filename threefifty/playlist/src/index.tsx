
import{ serve } from "bun";
import index from "./index.html";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {

    return new Response("<h1>SSpotify Playlist</h1>",{
      headers: { "Content-Type": "text/html" }
    });
  }
});

console.log(`Listening on http://localhost:${server.port} ...`);