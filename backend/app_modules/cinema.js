const express = require('express');
const router = express.Router();

module.exports = (connection) => {


    router.get('/cinemas', (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query("SELECT * FROM cinemas",
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

    router.get('/cinema/:id', (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query("SELECT * FROM cinemas WHERE idcinemas = ?",
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
    
    router.post('/cinema', (req, resp) => {
        let cinema = req.body;

        console.log(req.body);
    
        if (cinema == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO cinemas SET ?',
            [cinema], 
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
    
    router.put('/cinema/:id', (req, resp) => {
        let id_cinema = req.params.id;
        let cinema = req.body;    
    
        connection.query('UPDATE cinemas SET ? WHERE idcinema = ?',
        [cinema, id_cinema], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/cinema/:id', (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query('DELETE FROM cinemas WHERE idcinema = ?',
        [id_cinema], 
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