import { Router} from 'express';

const routes = Router();

routes.post("/documents");
routes.get("/documents");
routes.get("documents/:documentId");
routes.delete("/documents/:documentId")

export default routes;