const request = require("supertest");
const app = require("../app");

describe("GET /api/users", () => {
  it("debería requerir autenticación y devolver 401", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/users/:id", () => {
  it("debería devolver 404 o 401 si el usuario no existe o no está autenticado", async () => {
    const fakeId = "64aa11111111111111111111";
    const res = await request(app).get(`/api/users/${fakeId}`);
    expect([401, 404]).toContain(res.statusCode);
  });
});
