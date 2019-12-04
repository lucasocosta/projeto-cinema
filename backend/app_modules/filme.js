const express = require('express');
const router = express.Router();

module.exports = (connection,verifica_token) => {

    router.get('/filmes',verifica_token, (req, resp) => {

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

    router.get('/filme/:id',verifica_token, (req, resp) => {
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
    
    router.post('/filme',verifica_token, (req, resp) => {
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
    
    router.put('/filme/:id',verifica_token, (req, resp) => {
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
    
    router.delete('/filme/:id',verifica_token, (req, resp) => {
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