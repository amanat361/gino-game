import { serve } from "bun";
import index from "./index.html";
import generateStoryHandler from "./api/generate-story";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/generate-story": {
      async POST(req) {
        return await generateStoryHandler(req);
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
