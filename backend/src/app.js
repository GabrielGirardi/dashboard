const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://devggirardi:MrWthRKqAO6QaKl4@api-node.hkdhyoa.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'dashboard';

app.use(async (req, res, next) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        req.dbClient = client;
        req.db = client.db(dbName);
        next();
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rotas
app.use('/api', routes);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
