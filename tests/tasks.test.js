const request = require("supertest");
const app = require("../app");

describe("GET /api/tasks", () => {
  it("debería requerir autenticación y devolver 401", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/tasks/:id", () => {
  it("debería devolver 404 o 401 si la tarea no existe o no está autenticado", async () => {
    const fakeId = "64aa11111111111111111111";
    const res = await request(app).get(`/api/tasks/${fakeId}`);
    expect([401, 404]).toContain(res.statusCode);
  });
});
