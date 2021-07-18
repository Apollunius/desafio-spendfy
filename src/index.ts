import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);


const port = process.env.PORT ?? 9999;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
