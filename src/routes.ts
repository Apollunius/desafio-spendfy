import { Router} from 'express';
import { createDocument } from './controllers/Document';

const routes = Router();

routes.post("/documents", createDocument);
routes.get("/documents");
routes.get("documents/:documentId");
routes.delete("/documents/:documentId")

export default routes;