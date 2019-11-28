const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/filmes', (req, resp) => {

        connection.query("SELECT * FROM filme",
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

    router.get('/filme/:id', (req, resp) => {
        let id_filme = req.params.id;
    
        connection.query("SELECT * FROM filme WHERE idfilme = ?",
        [id_filme],
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
    
    router.post('/filme', (req, resp) => {
        let filme = req.body;

        console.log(req.body);
    
        if (filme == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO filme SET ?',
            [filme], 
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
    
    router.put('/filme/:id', (req, resp) => {
        let id_filme = req.params.id;
        let filme = req.body;    
    
        connection.query('UPDATE filme SET ? WHERE idfilme = ?',
        [filme, id_filme], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/filme/:id', (req, resp) => {
        let id_filme = req.params.id;
    
        connection.query('DELETE FROM filme WHERE idfilme = ?',
        [id_filme], 
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