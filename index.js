const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade_api_herois',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

app.post('/herois', async (req, res) => {
    const { nome, poder, nivel, hp } = req.body;
    const query = `INSERT INTO herois (nome, poder, nivel, hp) VALUES ($1, $2 , $3, $4) RETURNING *`; 
    const values = [nome, poder, nivel, hp];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir o heroi', error);
        res.status(500).json({ error: 'Erro ao inserir o heroi'});
    }
});

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de heróis!');
});


app.get('/herois', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM herois');
        res.send(result.rows);
    } catch (error) {
        console.error('Erro ao buscar herois', error);
        res.status(500).send('Erro ao buscar herois');
    }
});

app.get('/herois/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM herois WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Heroi não encontrado');
        }
        res.send(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o heroi', error);
        res.status(500).send('Erro ao buscar o heroi');
    }
});

app.put('/herois/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, poder } = req.body;
    const query = `UPDATE herois SET nome = $1, poder = $2 WHERE id = $3`;
    const values = [nome, poder, id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).send('Heroi não encontrado');
        }
        res.send('Heroi atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar o heroi', error);
        res.status(500).send('Erro ao atualizar o heroi');
    }
});

app.delete('/herois/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM herois WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Heroi não encontrado');
        }
        res.send('Heroi excluido com sucesso');
    } catch (error) {
        console.error('Erro ao excluir o heroi', error);
        res.status(500).send('Erro ao excluir o heroi');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

