import request from 'supertest';

import { application , Shutdown } from '../../src/server';


describe('Our Application ', () => {

    afterAll((done) => {

    Shutdown(done);
    });
    
    
    it('Start the server and run test', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    },10000);

    it("Return alll options (Http Metod) allow to be called ", async () => {
         const respone = await request(application).options('/');
         expect(respone.status).toBe(200);
         expect(respone.headers['access-control-allow-methods']).toBe('PUT,DELETE,PATCH,POST,GET')

    })

    it("Validate Custommer data   ", async () => {
        const respone = await request(application).POST('')
        expect(respone.status).toBe(200);

   })
});