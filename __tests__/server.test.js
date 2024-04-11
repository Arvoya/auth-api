"use strict";

require("dotenv").config();
process.env.SECRET = "arvoyaTEST";
const { server } = require("../src/server.js");
const { sequelize, appts, recs, concerns } = require("../src/models");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const { db, users } = require("../src/auth/models/index.js");

const request = supertest(server);

let appt1;
let rec1;
let concern1;
let practitioner;
let client;

beforeAll(async () => {
  await db.sync();
  await sequelize.sync();
  practitioner = await users.create({
    username: "p",
    password: "p",
    role: "practitioner",
  });
  client = await users.create({
    username: "c",
    password: "c",
    role: "client",
  });
  appt1 = await appts.create({
    date: new Date(),
    type: "in-person",
  });
  concern1 = await concerns.create({
    description: "OWIE",
    type: "physical",
    appointmentID: 1,
  });
  rec1 = await recs.create({
    description: "meditateTest",
    type: "physical",
    appointmentID: 1,
  });
});

afterAll(async () => {
  await db.drop();
  await sequelize.drop();
});

describe("Testing Recs, Concerns, Appts", () => {
  it("Client should create a new appt on POST /appts", async () => {
    let token = jwt.sign({ username: client.username }, process.env.SECRET);
    const response = await request
      .post("/api/v2/appts")
      .set("Authorization", `Bearer ${token}`)
      .send({ date: new Date(), type: "virtual" });

    expect(response.status).toBe(201);
    expect(response.body.type).toBe("virtual");
  });
  it("Client should get a list of appts on GET /appts", async () => {
    let token = jwt.sign({ username: client.username }, process.env.SECRET);
    const response = await request
      .get("/api/v2/appts")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
  it("Client should get a appt on GET /appts/:id", async () => {
    let token = jwt.sign({ username: client.username }, process.env.SECRET);
    const response = await request
      .get(`/api/v2/appts/${appt1.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0].Recommendations[0].description).toBe(
      "meditateTest",
    );
  });
  it("Practitioner should get concerns from the appointment their client made from GET /appts/:id", async () => {
    let token = jwt.sign(
      { username: practitioner.username },
      process.env.SECRET,
    );
    const response = await request
      .get(`/api/v2/appts/${appt1.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body[0].Concerns[0].description).toBe("OWIE");
  });
  it("Practitioner should update a recommendation on PUT /recs/:id", async () => {
    let token = jwt.sign(
      { username: practitioner.username },
      process.env.SECRET,
    );
    const response = await request
      .put(`/api/v2/recs/${rec1.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "how about you stop",
        type: "physical",
        appointmentID: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body.description).toEqual("how about you stop");
  });
});
