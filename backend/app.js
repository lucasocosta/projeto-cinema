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

const jwt  = require('jsonwebtoken');

verifica_token = (req, resp, next) => {
    let token = req.headers['x-access-token'];

    console.log("Chegou");
    console.log(token);

    if (!token)
        return resp.status(401).end();

    jwt.verify(token, 'senhatunada', (err, decoded) => {
        if (err)
            return resp.status(401).end();

        req.id_usuario_logado = decoded.id
        next();
    });
}


const usermodule = require('./app_modules/usuario.js');
const cinemamodule = require('./app_modules/cinema.js');
const enderecomodule = require('./app_modules/endereco.js');
const salamodule = require('./app_modules/sala.js');
const cadeiramodule = require('./app_modules/cadeiras.js');
const filmemodule = require('./app_modules/filme.js');
const sessaomodule = require('./app_modules/sessao.js');

app.use(express.json());
app.use(usermodule(connection, verifica_token));
app.use(cinemamodule(connection, verifica_token));
app.use(enderecomodule(connection, verifica_token));
app.use(salamodule(connection, verifica_token));
app.use(cadeiramodule(connection, verifica_token));
app.use(filmemodule(connection, verifica_token));
app.use(sessaomodule(connection, verifica_token));



app.post('/auth', (req, resp) => {
    let user = req.body;    

    connection.query("SELECT * FROM usuario WHERE email = ? and senha = ?",
    [user.email, user.senha],
    (err, result) => {

        if (result.length == 0) {
            resp.status(401);
            resp.send({token: null, success: false});
        } else {
            let token = jwt.sign({id: result[0].idusuario}, 'senhatunada', {
                expiresIn: 6000        
            });
    
            resp.status(200);
            resp.send({token: token, success: true});
        }        
    })
});


app.listen('3000', () => {
    connection.connect((err) => {
        if (err) return console.log(err);
        console.log('Backend conectado e escutando na porta 3000 ...')
    });    
});