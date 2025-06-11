const request = require("supertest");
const app = require("../app");

describe("GET /api/routines", () => {
  it("debería requerir autenticación y devolver 401", async () => {
    const res = await request(app).get("/api/routines");
    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/routines/:id", () => {
  it("debería devolver 404 o 401 si la rutina no existe o no está autenticado", async () => {
    const fakeId = "64aa11111111111111111111";
    const res = await request(app).get(`/api/routines/${fakeId}`);
    expect([401, 404]).toContain(res.statusCode);
  });
});
