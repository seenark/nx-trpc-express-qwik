import express from "express";
import * as path from "path";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@nx/trpc";
import cookiesParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookiesParser());

app.use(
  "/trpc",
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/healthz", (_req, res) => {
  res.status(200).send("Ok");
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
