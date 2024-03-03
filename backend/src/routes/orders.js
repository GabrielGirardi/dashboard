const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await req.db.collection('orders').find({}).toArray();
        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send('O corpo da solicitação está vazio');
        }
        const result = await req.db.collection('orders').insertOne(data);
        const insertedId = result.insertedId;

        res.json({ _id: insertedId });
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await req.db.collection('orders').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.send('Cliente excluído com sucesso');
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send('O corpo da solicitação está vazio');
        }

        const result = await req.db.collection('orders').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Pedido não encontrado');
        }

        res.send('Pedido editado com sucesso');
    } catch (error) {
        console.error('Erro ao editar pedido:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;
