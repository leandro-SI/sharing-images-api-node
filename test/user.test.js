const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

let mainUser = { name: "Leandro", email: "leandro@gmail.com", password: "1234"}

beforeAll(() => {
    return request.post("/user/create")
        .send(mainUser)
        .then(res => {})
        .catch(err => console.log(err))
})

afterAll(() => {
    return request.delete("/user/delete/" + mainUser.email)
        .then(res => {})
        .catch(err => console.log(err))
})

describe("Cadastro de usuário", () => {

    test("Deve cadastrar um usuário com sucesso", () => {

        let time = Date.now();
        let email = `${time}@gmail.com`
        let user = {
            name: "Leandro",
            email,
            password: "1234"
        };

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
         
        return request.post("/user/create")
        .send(mainUser)
        .then((response) => {
            expect(response.statusCode).toEqual(400)
            expect(response.body.error).toEqual("E-mail já cadastrado");
        }).catch(err => {
            fail(err)
        });
    })

})

describe("Autenticação", () => {

    test('Deve me retornar um token quando logar', () => {
        return request.post("/auth")
            .send({email: mainUser.email, password: mainUser.password})
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined();
            }).catch(err => {
                fail(err);
            })
    })
})