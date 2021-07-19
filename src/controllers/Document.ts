import type { Request, Response } from "express";
import knex from "../database/index";
import validateDocument from "../helpers/validators/DocumentValidator";

export async function createDocument(req: Request, res: Response) {
  const { name, content } = req.body;
  try {
    validateDocument({ name, content });

    const checkName = await knex("documents")
      .first("*")
      .where("name", name)
      .andWhere("deletedAt", null);

    if (!checkName) {
      const buff = Buffer.from(content);
      const base64data = buff.toString("base64");
      const kbSize = buff.byteLength / 1000; //transformando o de byte para kbyte

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
