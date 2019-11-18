const express = require('express');
const router = express.Router();

module.exports = (connection) => {



    router.get('/usuarios', (req, resp) => {
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

    router.get('/usuario/:id', (req, resp) => {
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
    
    router.post('/usuario', (req, resp) => {
        let usuario = req.body;

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
    
    router.put('/usuario/:id', (req, resp) => {
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
    
    router.delete('/usuario/:id', (req, resp) => {
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