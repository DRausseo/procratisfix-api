const request = require("supertest");
const app = require("../app");

describe("GET /api/goals", () => {
  it("debería requerir autenticación y devolver 401", async () => {
    const res = await request(app).get("/api/goals");
    expect(res.statusCode).toBe(401); // Redirige si no hay sesión
  });
});

describe("GET /api/goals/:id", () => {
  it("debería devolver 404 o 401 si no existe o no está autenticado", async () => {
    const fakeId = "64aa11111111111111111111";
    const res = await request(app).get(`/api/goals/${fakeId}`);
    expect([401, 404]).toContain(res.statusCode);
  });
});
