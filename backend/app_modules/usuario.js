const express = require('express');
const moment = require('moment');
const router = express.Router();

module.exports = (connection, verifica_token) => {
    router.get('/usuarios', verifica_token, (req, resp)=> {
        let id_cinema = req.params.id;
    
        connection.query("SELECT * FROM usuario",
        [id_cinema],
        (err, result) => {
            
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });    
    });

    router.get('/usuario/:id', verifica_token, (req, resp) => {
        let id_usuario = req.params.id;
    
        connection.query("SELECT * FROM usuario WHERE idusuario = ?",
        [id_usuario],
        (err, result) => {
            
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result[0]);            
            }
        });    
    });
    
    router.post('/usuario', verifica_token, (req, resp) => {
        let usuario = req.body;

        //console.log(moment.utc(usuario.data_nasc));
        usuario.data_nasc=moment(usuario.data_nasc).format('YYYY-MM-DDTHH:mm:ss');

        if("endereco" in usuario)
        {
            delete usuario.endereco;
        }

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
    
    router.put('/usuario/:id', verifica_token, (req, resp) => {
        let id_usuario = req.params.id;
        let usuario = req.body;

        if("endereco" in usuario)
        {
            delete usuario.endereco;
        }
    
        connection.query('UPDATE usuario SET ? WHERE idusuario = ?',
        [usuario, id_usuario], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/usuario/:id', verifica_token, (req, resp) => {
        let id_usuario = req.params.id;
    
        connection.query('DELETE FROM usuario WHERE idusuario = ?',
        [id_usuario], 
        (err, result) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    


    return router;
}