const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");
const Users = require("../users/users-model");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should create a new user", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing" });

      users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should give a token with the response", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing" });

      expect(res.body.token).toBeDefined();
    });

    it("should not create user if req does not include username and pass", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian" });

      expect(res.body.message).toMatch(/provide required credentials/i);

      users = await db("users");
      expect(users).toHaveLength(0);
    });

    it("should not create user if username is already taken", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing" });

      users = await db("users");
      expect(users).toHaveLength(1);

      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing" });

      expect(res.body.message).toMatch(/taken/i);

      users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
});
