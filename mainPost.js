const express = require('express');
const sqlite3 = require('sqlite3');
const srv = express();
srv.use(express.static('public_html'));

srv.use(require('body-parser').urlencoded({ extended: false }));


srv.get('/', (req, res)=>{
    res.send('Página inicial aqui.');
});


// Listar
srv.get('/listar', (req, res)=>{
    const db = new sqlite3.Database('empresa.db');
    const sql = `SELECT * FROM funcionarios`;

    db.all(sql, [], (erro, linhas)=>{
        res.json(linhas);
    });
});
///////////////////////////////////////////////////////////////

// Registrar
srv.post('/registrar', (req, res)=>{
    const db = new sqlite3.Database('empresa.db');
    const sql = `insert into funcionarios values (?, ?);`;

    console.log(`Nome: ${req.body.nome}, e cargo: '${req.body.cargo}' 
                registrados no DB com sucesso.`); // Aqui printamos no prompt

    db.run(sql, [req.body.nome, req.body.cargo], (resultado, erro)=>{ // Aqui enviamos os dados para  DB
        if (erro) {
            res.send({
                status:'Erro',
                msg: erro})
        } else {
            res.send({
                status: 'OK',
                msg: 'Registro enviado.'})
        }
    });
});
///////////////////////////////////////////////////////////////

// Deletar
srv.post('/deletar', (req, res)=>{
    const db = new sqlite3.Database('empresa.db');
    const sql = `delete from funcionarios where nome = ?`;

    db.run(sql, [req.body.nome], (resultado, erro)=>{ // Aqui enviamos os dados para  DB
        if (erro) {
            res.json({
                status:'Erro',
                msg: erro})
        } else {
            res.json({
                status: 'OK',
                msg: 'Nome deletado.'})
        }
    });
});
///////////////////////////////////////////////////////////////

// Modificar
srv.post('/modificar', (req, res)=>{
    const db = new sqlite3.Database('empresa.db');
    const sql = `update funcionarios set nome = ? where nome = ?`;

    db.run(sql, [req.body.novoNome, req.body.nomeSelecionado], (resultado, erro)=>{
        if (erro) {
            res.send({
                status:'Erro',
                msg: erro})
        } else {
            res.send({
                status: 'OK',
                msg: 'Alteração com sucesso.'})
        }
    });
});
///////////////////////////////////////////////////////////////

// Modificar cargo
srv.post('/modificarCargo', (req, res)=>{
    const db = new sqlite3.Database('empresa.db');
    const sql = `update funcionarios set cargo = ? where nome = ?`;

    db.run(sql, [req.body.novoCargo, req.body.nomeSelecionado], (resultado, erro)=>{
        if (erro) {
            res.send({
                status:'Erro',
                msg: erro})
        } else {
            res.send({
                status: 'OK',
                msg: 'Alteração com sucesso.'})
        }
    });
});


srv.listen(3030, ()=>{
    console.log('Iniciando o programa...');
});