const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'cinema'
});

const usermodule = require('./app_modules/usuario.js');
const cinemamodule = require('./app_modules/cinema.js');

app.use(express.json());
app.use(usermodule(connection));
app.use(cinemamodule(connection))



app.post('/usuario1', (req, resp) => {
  let usuario = req.body;

  console.log(req.body);

  if (usuario == null) {
      resp.status(204).end();
  } else {
      connection.query('INSERT INTO usuario SET ?',
      [usuario], 
      (err, result) => {

          if (err) {
              console.log(err);
              resp.status(500).end();
          } else {
              resp.status(200);
              resp.json(result);
          }
      });
  }    
});

app.listen('3000', () => {
    connection.connect((err) => {
        if (err) return console.log(err);
        console.log('Backend conectado e escutando na porta 3000 ...')
    });    
});