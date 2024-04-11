"use strict";

require("dotenv").config();
const { server } = require("../src/server.js");
const { db, food, clothes } = require("../src/models");
const supertest = require("supertest");

const request = supertest(server);

let foodItem;
let clothesItem;

beforeAll(async () => {
  await db.sync();
  foodItem = await food.create({
    name: "apple",
    calories: 100,
    type: "fruit",
  });
  clothesItem = await clothes.create({
    name: "shirt",
    color: "blue",
    size: "medium",
  });
});

afterAll(async () => {
  db.drop();
});

describe("Food and Clothes routes", () => {
  it("Should create a new food item on POST /food", async () => {
    const response = await request
      .post("/api/v1/food")
      .send({ name: "banana", calories: 150, type: "fruit" });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("banana");
  });
  it("should get a list of food items on GET /food", async () => {
    const response = await request.get("/api/v1/food");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("should get a food item on GET /food/:id", async () => {
    const response = await request.get(`/api/v1/food/${foodItem.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("apple");
  });
  it("should update a food item on PUT /food/:id", async () => {
    const response = await request
      .put(`/api/v1/food/${foodItem.id}`)
      .send({ name: "orange", calories: 200, type: "fruit" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("orange");
  });
  it("should delete a food item on DELETE /food/:id", async () => {
    const response = await request.delete(`/api/v1/food/${foodItem.id}`);
    expect(response.status).toBe(200);
  });
});
