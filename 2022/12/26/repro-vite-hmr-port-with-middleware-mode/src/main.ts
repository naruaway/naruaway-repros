import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "node:http";

const PORT = 8728;

const main = async () => {
  const app = express();
  const server = createServer(app);

  // cf. [Server-Side Rendering | Vite](https://vitejs.dev/guide/ssr.html)
  const vite = await createViteServer({
  base: '/my-vite-path/',
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Note that practically we do actual SSR but it is not relevant for this repro so we just return static HTML here
  app.use("*", async (req, res) => {
    const template = `
 <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
  <script type="module" src="/src/entry-client.ts"></script>
</head>
<body>
</body>
</html>
`;
    const url = req.originalUrl;
    const finalhtml = await vite.transformIndexHtml(url, template);
    res.status(200).set({ "content-type": "text/html" }).end(finalhtml);
  });

  server.listen(PORT);
  console.log(`Open http://localhost:${PORT}`);
};

void main();
