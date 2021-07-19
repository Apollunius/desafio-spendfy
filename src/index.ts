import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// knex.migrate.latest();
const port = process.env.PORT ?? 9999;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
