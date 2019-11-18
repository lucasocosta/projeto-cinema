const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/cadeiras/:id', (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query("SELECT * FROM cadeiras WHERE idsala = ?",
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

    router.get('/cadeira/:id', (req, resp) => {
        let id_cadeira = req.params.id;
    
        connection.query("SELECT * FROM cadeiras WHERE idcadeira = ?",
        [id_cadeira],
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
    
    router.post('/cadeira', (req, resp) => {
        let cadeira = req.body;

        console.log(req.body);
    
        if (cadeira == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO cadeiras SET ?',
            [cadeira], 
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
    
    router.put('/cadeira/:id', (req, resp) => {
        let id_cadeira = req.params.id;
        let cadeira = req.body;    
    
        connection.query('UPDATE cadeiras SET ? WHERE idcadeira = ?',
        [cadeira, id_cadeira], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/cadeira/:id', (req, resp) => {
        let id_cadeira = req.params.id;
    
        connection.query('DELETE FROM cadeiras WHERE idcadeira = ?',
        [id_cadeira], 
        (err, result) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });

    router.delete('/cadeiras/:id', (req, resp) => {
        let id_sala = req.params.id;
    
        connection.query('DELETE FROM cadeiras WHERE idsala = ?',
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