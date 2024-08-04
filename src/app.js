const express = require('express');
const app = express();
const mongoose = require('mongoose');
let user = require('./models/User');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/guiapics").then(() => {
    //console.log("Conectado com o bando")
}).catch((err) => {
    console.log("Erro ao conectar com o banco: ", err)
})

let User = mongoose.model("User", user);

app.get('/', (req, res) => {
    return res.status(200).json({})
})

app.post('/user/create', async (request, response) => {
    try {
        const {name, email, password} = request.body;

        if (name == "" || email == "" || password == "") {
            return response.status(400).json("dados inválidos");
        }

        let newUser = new User({name: name, email: email, password: password});
        await newUser.save();

        response.status(200).json({email: email})
    } catch (error) {
        response.sendStatus(500);
    }
})

module.exports = app;