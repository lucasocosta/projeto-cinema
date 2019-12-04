const express = require('express');
const router = express.Router();
const moment = require('moment');



module.exports = (connection,verifica_token) => {
    router.get('/sessoes/:id',verifica_token, (req, resp) => {
        let id_cinema = req.params.id;
    
        connection.query("SELECT DISTINCT sessao.* FROM sessao INNER JOIN "+
        "salas ON sessao.idsala = salas.idsala INNER JOIN cinemas "+
        "ON salas.idcinema = ?;",
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
    

    router.get('/sessao/:id',verifica_token, (req, resp) => {
        let id_sessao = req.params.id;
    
        connection.query("SELECT * FROM sessao WHERE idsessao = ?",
        [id_sessao],
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
    
    router.post('/sessao',verifica_token, (req, resp) => {
        let sessao = req.body;


        sessao.horainicio=moment(sessao.horainicio).format('YYYY-MM-DDTHH:mm:ss');
        sessao.horafim=moment(sessao.horafim).format('YYYY-MM-DDTHH:mm:ss');
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
    
    router.put('/sessao/:id',verifica_token, (req, resp) => {
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
    
    router.delete('/sessao/:id',verifica_token, (req, resp) => {
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