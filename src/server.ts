import dotenv from "dotenv";

import app from ".";

dotenv.config();

const port = process.env.PORT ?? 9999;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
