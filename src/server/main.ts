import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import router from "./routes/api";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use("/api", router);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);