/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
} from "./controllers/Document";
import { getWeekday } from "./controllers/WeekAfter";

const routes = Router();

routes.post("/documents", createDocument);
routes.get("/documents", getDocuments);
routes.get("/documents/:documentId", getDocument);
routes.delete("/documents/:documentId", deleteDocument);

routes.get("/weekday-after", getWeekday); // ?startDay={startDay}&amountOfDays={amountOfDays}

export default routes;
