const express = require('express');
const router = express.Router();

module.exports = (connection) => {

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
                resp.json(result);            
            }
        });    
    });
    
    router.post('/usuario', (req, resp) => {
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
    
    router.put('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
        let usuario = req.body;    
    
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