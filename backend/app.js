const express = require('express');
const app = express();
const host='localhost';


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'cinema'
});

var cors = require('cors');
app.use(cors());

const usermodule = require('./app_modules/usuario.js');
const cinemamodule = require('./app_modules/cinema.js');
const enderecomodule = require('./app_modules/endereco.js');
const salamodule = require('./app_modules/sala.js');
const cadeiramodule = require('./app_modules/cadeiras.js');

app.use(express.json());
app.use(usermodule(connection));
app.use(cinemamodule(connection))
app.use(enderecomodule(connection))
app.use(salamodule(connection))
app.use(cadeiramodule(connection))



app.listen('3000', () => {
    connection.connect((err) => {
        if (err) return console.log(err);
        console.log('Backend conectado e escutando na porta 3000 ...')
    });    
});