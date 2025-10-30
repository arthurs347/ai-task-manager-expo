import {GET} from "@/app/api/test+api";

describe("api/test", () => {
    describe("GET /api/test", () => {
        it("should return 200 given no params", async () => {
            const req = new Request("http://localhost/api/test");
            const res = await GET(req);
            expect(res).toBeInstanceOf(Response);
            expect(res.status).toBe(200);
        });
    });
});