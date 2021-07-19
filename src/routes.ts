import { Router } from "express";

import { createDocument, getDocument, getDocuments } from "./controllers/Document";

const routes = Router();

routes.post("/documents", createDocument);
routes.get("/documents", getDocuments);
routes.get("/documents/:documentId", getDocument);
routes.delete("/documents/:documentId");

export default routes;
