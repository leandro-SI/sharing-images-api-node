const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

        let userExist = await User.findOne({"email": email});

        if (userExist != null) {
            return response.status(400).json({error: "E-mail já cadastrado"});
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let newUser = new User({name: name, email: email, password: hash});
        await newUser.save();
        response.status(200).json({email: email})
    } catch (error) {
        response.sendStatus(500);
    }
})

module.exports = app;