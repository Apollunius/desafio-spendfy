import dotenv from "dotenv";
import express from "express";

import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// knex.migrate.latest();
const port = process.env.PORT ?? 9999;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
