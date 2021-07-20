import supertest from "supertest";

import app from "../src";

describe("Weekday-After", () => {
  const request = supertest(app);

  test("should returns 'domingo' when sending startDay = 'segunda' and amountOfDays = 6", async () => {
    const response = await request.get(
      "/weekday-after?startDay=segunda&amountOfDays=6"
    );

    expect(response.status).toBe(200);
    expect(response.body.day).toBe("domingo");
  });

  test("should returns 'quarta' when sending startDay = 'terça' and amountOfDays = 1", async () => {
    const response = await request.get(
      "/weekday-after?startDay=terça&amountOfDays=1"
    );

    expect(response.status).toBe(200);
    expect(response.body.day).toBe("quarta");
  });

  test("should returns 'sexta' when sending startDay = 'quinta' and amountOfDays = 365", async () => {
    const response = await request.get(
      "/weekday-after?startDay=quinta&amountOfDays=365"
    );

    expect(response.status).toBe(200);
    expect(response.body.day).toBe("sexta");
  });

  test("should returns error when don't send startDay", async () => {
    const response = await request.get("/weekday-after?amountOfDays=6");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Weekday is required");
  });

  test("should returns error when don't send amountOfDays", async () => {
    const response = await request.get("/weekday-after?startDay=segunda");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("amountOfDays is required");
  });

  test("should returns error when sending a invalid weekday", async () => {
    const response = await request.get(
      "/weekday-after?startDay=friday&amountOfDays=0"
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Weekday is invalid");
  });

  test("should returns error when sending a invalid amountOfDays", async () => {
    const response = await request.get(
      "/weekday-after?startDay=sexta&amountOfDays=invalid"
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("amountOfDays is invalid");
  });
});
