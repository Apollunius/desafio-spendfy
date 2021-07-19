import { Router } from "express";

import { createDocument, deleteDocument, getDocument, getDocuments } from "./controllers/Document";

const routes = Router();

routes.post("/documents", createDocument);
routes.get("/documents", getDocuments);
routes.get("/documents/:documentId", getDocument);
routes.delete("/documents/:documentId", deleteDocument);

export default routes;