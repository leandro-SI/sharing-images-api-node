const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

describe("Cadastro de usuário", () => {

    test("Deve cadastrar um usuário com sucesso", () => {

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name: "Leandro", email: email, password: "123456"};

        return request.post("/user/create")
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.email).toEqual(email)
            }).catch(err => {
                fail(err)
            });
    })
})