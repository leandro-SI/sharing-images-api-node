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

    test("Deve impedir que um usuário se cadastre com os dados vazios", () => {
         
        let user = { name: "", email: "", password: ""};

        return request.post("/user/create")
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(400)
            }).catch(err => {
                fail(err)
            });
    })

    test('Deve impedir que um usuário se cadastre com um email repetido', () => { 
         
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name: "Leandro", email: email, password: "123456"};

        return request.post("/user/create")
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(400);
                expect(response.body.email).toEqual(email);

                return request.post("/user/create")
                    .send(user)
                    .then((response) => {
                        expect(response.statusCode).toEqual(400)
                        expect(response.body.error).toEqual("E-mail já cadastrado");
                    }).catch(err => {
                        fail(err)
                    });
                    
            }).catch(err => {
                fail(err)
            });
    })

})