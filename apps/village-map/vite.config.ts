import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import solid from "vite-plugin-solid";

function serveDataDir(): Plugin {
  const root = process.cwd();
  return {
    name: "village-map:serve-data",
    configureServer(server) {
      server.middlewares.use("/data", (req, res, next) => {
        if (!req.url) return next();
        const filePath = resolve(root, "data", req.url.replace(/^\//, ""));
        if (!filePath.startsWith(resolve(root, "data"))) {
          res.statusCode = 403;
          return res.end("Forbidden");
        }
        import("node:fs").then(({ createReadStream, statSync }) => {
          try {
            statSync(filePath);
            res.setHeader("Content-Type", "application/json");
            createReadStream(filePath).pipe(res);
          } catch {
            res.statusCode = 404;
            res.end("Not found");
          }
        });
      });
    },
    async closeBundle() {
      const distDataDir = resolve(root, "dist", "data");
      await mkdir(distDataDir, { recursive: true });
      const dataDir = resolve(root, "data");
      const files = await readdir(dataDir);
      await Promise.all(files.map((f) => copyFile(resolve(dataDir, f), resolve(distDataDir, f))));
    },
  };
}

export default defineConfig({
  plugins: [solid(), tailwindcss(), serveDataDir()],
  envDir: ".",
  resolve: {
    alias: {
      "~": new URL("./src", import.meta.url).pathname,
    },
  },
  server: { port: 5173 },
});
