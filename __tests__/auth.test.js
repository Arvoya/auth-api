"use strict";

require("dotenv").config();
process.env.SECRET = "arvoyaTEST";
const { server } = require("../src/server.js");
const { db, users } = require("../src/auth/models");
const jwt = require("jsonwebtoken");
const supertest = require("supertest");

const request = supertest(server);
let userP;

beforeAll(async () => {
  await db.sync();
  userP = await users.create({
    username: "testA",
    password: "testA",
    role: "practitioner",
  });
});

afterAll(async () => {
  db.drop();
});

describe("Client Auth routes", () => {
  it("Should create a new client on POST /signup", async () => {
    const response = await request
      .post("/auth/signup")
      .send({ username: "testC", password: "testC" });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe("testC");
    expect(response.body.token).toBeTruthy();
  });

  it("Client should sign in with basic auth", async () => {
    const response = await request.post("/auth/signin").auth("testC", "testC");
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("testC");
    expect(response.body.token).toBeTruthy();
  });

  it("should not get a list of clients on GET /users", async () => {
    let token = jwt.sign({ username: "testC" }, process.env.SECRET);
    const response = await request
      .get("/auth/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

  it("should get a secret on GET /secret", async () => {
    let token = jwt.sign({ username: userP.username }, process.env.SECRET);
    const response = await request
      .get("/auth/secret")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the secret area");
  });
});

describe("Practitioner Auth routes", () => {
  it("Should create a new practitioner on POST /signup", async () => {
    const response = await request
      .post("/auth/signup")
      .send({ username: "testP", password: "testP", role: "practitioner" });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe("testP");
    expect(response.body.token).toBeTruthy();
  });

  it("Client should sign in with basic auth", async () => {
    const response = await request.post("/auth/signin").auth("testP", "testP");
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("testP");
    expect(response.body.token).toBeTruthy();
  });

  it("should get a list of clients on GET /users", async () => {
    let token = jwt.sign({ username: userP.username }, process.env.SECRET);
    const response = await request
      .get("/auth/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should get a secret on GET /secret", async () => {
    let token = jwt.sign({ username: userP.username }, process.env.SECRET);
    const response = await request
      .get("/auth/secret")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the secret area");
  });
});
