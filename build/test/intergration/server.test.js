"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
describe('Our Application ', () => {
    afterAll((done) => {
        (0, server_1.Shutdown)(done);
    });
    it('Start the server and run test', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(server_1.application).toBeDefined();
    }, 10000);
    it("Return alll options (Http Metod) allow to be called ", async () => {
        const respone = await (0, supertest_1.default)(server_1.application).options('/');
        expect(respone.status).toBe(200);
        expect(respone.headers['access-control-allow-methods']).toBe('PUT,DELETE,PATCH,POST,GET');
    });
    it("Validate Custommer data   ", async () => {
        const respone = await (0, supertest_1.default)(server_1.application).POST('');
        expect(respone.status).toBe(200);
    });
});
