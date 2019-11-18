const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/salas/:id', (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query("SELECT * FROM salas WHERE idcinema = ?",
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

    router.get('/sala/:id', (req, resp) => {
        let id_sala = req.params.id;
    
        connection.query("SELECT * FROM salas WHERE idsala = ?",
        [id_sala],
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
    
    router.post('/sala', (req, resp) => {
        let sala = req.body;

        console.log(req.body);
    
        if (sala == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO salas SET ?',
            [sala], 
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
    
    router.put('/sala/:id', (req, resp) => {
        let id_sala = req.params.id;
        let sala = req.body;    
    
        connection.query('UPDATE salas SET ? WHERE idsala = ?',
        [sala, id_sala], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    
    router.delete('/sala/:id', (req, resp) => {
        let id_sala = req.params.id;
    
        connection.query('DELETE FROM salas WHERE idsala = ?',
        [id_sala], 
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