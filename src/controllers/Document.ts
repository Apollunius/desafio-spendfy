import type { Request, Response } from "express";

import knex from "../database";
import validateDocument from "../helpers/validators/DocumentValidator";
import validateId from "../helpers/validators/IdValidator";

export async function createDocument(req: Request, res: Response) {
  const { name, content } = req.body;

  try {
    validateDocument({ name, content });

    const checkName = await knex("documents").first("*").where("name", name).andWhere("deletedAt", null);

    if (!checkName) {
      const buff = Buffer.from(content);
      const base64data = buff.toString("base64");
      const kbSize = buff.byteLength / 1000; // transformando o de byte para kbyte

      const document = await knex("documents")
	  .insert({ kbSize, name, content: base64data })
	  .returning(["id", "name", "content", "kbSize"]);

      return res.status(201).json(document);
    }
    return res.status(400).json({ error: "Name already exists!" });
  } catch (err) {

    return res.status(err.status || 500).json({ error: err.message || "Algo deu errado" });
  }
}

export async function getDocuments(_: Request, res: Response) {
  try {
    const documents = await knex("documents")
	.select("id", "name", "content", "kbSize")
	.where("deletedAt", null)
	.orderBy("createdAt", "desc");

    return res.status(201).json(documents);
  } catch (err) {

    return res.status(err.status || 500).json({ error: err.message || "Algo deu errado" });
  }
}

export async function getDocument(req: Request, res: Response) {
  const { documentId } = req.params;

  try {
    validateId(documentId);

    const id = await knex("documents").first("*").where("id", documentId).andWhere("deletedAt", null);

    if (id) {
      const document = await knex("documents")
	  	.select("id", "name", "content", "kbSize")
	  	.where("id", documentId)
        .andWhere("deletedAt", null)
        .orderBy("createdAt", "desc");

      return res.status(201).json(document);
    }

    return res.status(404).json({ error: "Document not found!" });
  } catch (err) {

    return res.status(err.status || 500).json({ error: err.message || "Algo deu errado" });
  }
}

export async function deleteDocument(req: Request, res: Response) {
  const { documentId } = req.params;

  try {
    validateId(documentId);

    const id = await knex("documents").first("*").where("id", documentId).andWhere("deletedAt", null);

    if (id) {

      await knex("documents").update("deletedAt", new Date()).where("id", documentId);

      return res.status(200).json({ message: "Deleted document!" });
    }

    return res.status(404).json({ error: "Document not found!" });
  } catch (err) {

    return res.status(err.status || 500).json({ error: err.message || "Algo deu errado" });
  }
}
