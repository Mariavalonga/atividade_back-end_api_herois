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
    const query = `INSERT INTO herois (nome, poder, nivel, hp) VALUES ($1, $2, $3, $4) RETURNING *`; 
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
    const { nome } = req.query;

    try {
        let query = 'SELECT * FROM herois';

        if (nome) {
            query += ' WHERE nome ILIKE $1';
            const result = await pool.query(query, [`%${nome}%`]); 
            res.send(result.rows);
        } else {
            const result = await pool.query(query);
            res.send(result.rows);
        }
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

app.get('/herois/poder/:poder', async (req, res) => {
    const { poder } = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM herois WHERE poder = $1', [poder]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/herois/nome/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM herois WHERE nome = $1', [nome]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/batalhas/:heroi1_id/:heroi2_id', async (req, res) => {
    const { heroi1_id, heroi2_id } = req.params;

    try {
        const vencedorId = await calcularVencedor(heroi1_id, heroi2_id);
        await pool.query('INSERT INTO batalhas (heroi1_id, heroi2_id, vencedor_id) VALUES ($1, $2, $3)', [heroi1_id, heroi2_id, vencedorId]);

        const { rows } = await pool.query('SELECT * FROM herois WHERE id = $1', [vencedorId]);
        res.json({ vencedor: rows[0], message: 'Batalha realizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function calcularVencedor(heroi1_id, heroi2_id) {
    try {
        const heroi1 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi1_id]);
        const heroi2 = await pool.query('SELECT * FROM herois WHERE id = $1', [heroi2_id]);

        if (heroi1.rows[0].nivel > heroi2.rows[0].nivel) {
            return heroi1_id;
        } else if (heroi2.rows[0].nivel > heroi1.rows[0].nivel) {
            return heroi2_id;
        } else {
            if (heroi1.rows[0].hp > heroi2.rows[0].hp) {
                return heroi1_id;
            } else if (heroi2.rows[0].hp > heroi1.rows[0].hp) {
                return heroi2_id;
            }
        }
    } catch (error) {
        console.error("Erro ao calcular o vencedor da batalha:", error);
        throw error;
    }
}



app.get('/batalhas', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM batalhas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/batalhas/herois', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT batalhas.id, heroi1_id, heroi2_id, vencedor_id, herois.nome as vencedor_nome, herois.poder as vencedor_poder, herois.nivel as vencedor_nivel, herois.hp as vencedor_hp FROM batalhas INNER JOIN herois ON batalhas.vencedor_id = herois.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
