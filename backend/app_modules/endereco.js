const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/endereco/:id', (req, resp) => {
        let id_endereco = req.params.id;
    
        connection.query("SELECT * FROM endereco WHERE idendereco = ?",
        [id_endereco],
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
    
    router.post('/endereco', (req, resp) => {
        let endereco = req.body;

        console.log(req.body);
    
        if (endereco == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO endereco SET ?',
            [endereco], 
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
    
    router.put('/endereco/:id', (req, resp) => {
        let id_endereco = req.params.id;
        let endereco = req.body;    
    
        connection.query('UPDATE endereco SET ? WHERE idendereco = ?',
        [endereco, id_endereco], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/endereco/:id', (req, resp) => {
        let id_endereco = req.params.id;
    
        connection.query('DELETE FROM endereco WHERE idendereco = ?',
        [id_endereco], 
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