const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

test("A aplicação deve responder na porta 3131", async () => {    

    return request.get("/").then(res => {
        expect(res.statusCode).toEqual(200);
    }).catch(err => {
        fail(err)
    })
})