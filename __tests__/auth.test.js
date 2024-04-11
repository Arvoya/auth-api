"use strict";

require("dotenv").config();
const { server } = require("../src/server.js");
const { db, users } = require("../src/auth/models");
const jwt = require("jsonwebtoken");
const supertest = require("supertest");

const request = supertest(server);
let user;

beforeAll(async () => {
  await db.sync();
  user = await users.create({
    username: "testA",
    password: "testA",
    role: "admin",
  });
});

afterAll(async () => {
  db.drop();
});

describe("Auth routes", () => {
  it("Should create a new user on POST /signup", async () => {
    const response = await request
      .post("/auth/signup")
      .send({ username: "test", password: "test" });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe("test");
    expect(response.body.token).toBeTruthy();
  });

  it("should sign in with basic auth", async () => {
    const response = await request.post("/auth/signin").auth("test", "test");
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("test");
    expect(response.body.token).toBeTruthy();
  });

  //NOTE: THANKS COPILOT: "Check if the `jwt.sign` method is used correctly. It usually takes an object as the first argument and the secret as the second argument. If `user.username` is a string, you might want to change it to an object, like `{username: user.username}`."

  it("should get a list of users on GET /users", async () => {
    let token = jwt.sign({ username: user.username }, process.env.SECRET);
    console.log("user:", user.username, "token:", token);
    const response = await request
      .get("/auth/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should get a secret on GET /secret", async () => {
    let token = jwt.sign({ username: user.username }, process.env.SECRET);
    const response = await request
      .get("/auth/secret")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the secret area");
  });
});
