const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/ingresso/:id', (req, resp) => {
        let id_ingresso = req.params.id;
    
        connection.query("SELECT * FROM ingresso WHERE idingresso = ?",
        [id_ingresso],
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
    
    router.post('/ingresso', (req, resp) => {
        let ingresso = req.body;

        console.log(req.body);
    
        if (ingresso == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO ingresso SET ?',
            [ingresso], 
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
    
    router.put('/ingresso/:id', (req, resp) => {
        let id_ingresso = req.params.id;
        let ingresso = req.body;    
    
        connection.query('UPDATE ingresso SET ? WHERE idingresso = ?',
        [ingresso, id_ingresso], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/ingresso/:id', (req, resp) => {
        let id_ingresso = req.params.id;
    
        connection.query('DELETE FROM ingresso WHERE idingresso = ?',
        [id_ingresso], 
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