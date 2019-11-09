const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    router.get('/sessao/:id', (req, resp) => {
        let id_sessao = req.params.id;
    
        connection.query("SELECT * FROM sessao WHERE idsessao = ?",
        [id_sessao],
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
    
    router.post('/sessao', (req, resp) => {
        let sessao = req.body;

        console.log(req.body);
    
        if (sessao == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO sessao SET ?',
            [sessao], 
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
    
    router.put('/sessao/:id', (req, resp) => {
        let id_sessao = req.params.id;
        let sessao = req.body;    
    
        connection.query('UPDATE sessao SET ? WHERE idsessao = ?',
        [sessao, id_sessao], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/sessao/:id', (req, resp) => {
        let id_sessao = req.params.id;
    
        connection.query('DELETE FROM sessao WHERE idsessao = ?',
        [id_sessao], 
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