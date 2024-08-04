const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/guiapics").then(() => {
    //console.log("Conectado com o bando")
}).catch((err) => {
    console.log("Erro ao conectar com o banco: ", err)
})

app.get('/', (req, res) => {
    return res.status(200).json({})
})

module.exports = app;