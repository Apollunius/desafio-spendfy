import { randomBytes } from "crypto";

import supertest from "supertest";

import app from "../src";

describe("Documents", () => {
  const request = supertest(app);

  test("should create a new document on database", async () => {
    const object = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };
    const response = await request.post("/documents").send(object);

    expect(response.status).toBe(201);
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].name).toBe(object.name);
    expect(response.body[0].content).toBe(
      Buffer.from(object.content).toString("base64")
    );
  });

  test("should returns error when try create a document without name", async () => {
    const response = await request
      .post("/documents")
      .send({ content: "conteúdo" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name is required");
  });

  test("should returns error when try create a document without content", async () => {
    const response = await request.post("/documents").send({ name: "teste" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Content is required");
  });

  test("should returns error when try create a document with existent name", async () => {
    const object = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };

    await request.post("/documents").send(object);

    const response = await request.post("/documents").send(object);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name already exists!");
  });

  test("should return all documents", async () => {
    const object = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };
    const object2 = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };

    await request.post("/documents").send(object);
    await request.post("/documents").send(object2);
    const response = await request.get("/documents");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  test("should returns error when try get a document with a invalid id", async () => {
    const response = await request.get("/documents/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Id!");
  });

  test("should returns not found when try get a document with a unexistent id", async () => {
    const response = await request.get("/documents/1000");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Document not found!");
  });

  test("should returns the document by correct id", async () => {
    const object = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };
    const documentResponse = await request.post("/documents").send(object);
    const response = await request.get(
      `/documents/${documentResponse.body[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(documentResponse.body[0].id);
    expect(response.body.name).toBe(object.name);
  });

  test("should returns error when try delete a document with invalid id", async () => {
    const response = await request.delete("/documents/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Id!");
  });

  test("should returns delete a document", async () => {
    const object = {
      name: randomBytes(8).toString("hex"),
      content: "conteúdo",
    };
    const documentResponse = await request.post("/documents").send(object);
    const response = await request.delete(
      `/documents/${documentResponse.body[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deleted document!");

    const checkResponse = await request.get(
      `/documents/${documentResponse.body[0].id}`
    );

    expect(checkResponse.status).toBe(404);
  });

  test("should returns error when try delete a document with unexistent id", async () => {
    const response = await request.delete(`/documents/1000`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Document not found!");
  });
});
