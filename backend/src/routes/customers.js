const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await req.db.collection('customers').find({}).toArray();
    res.json(customers);
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
    const result = await req.db.collection('customers').insertOne(data);
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
    const result = await req.db.collection('customers').deleteOne({ _id: new ObjectId(id) });
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
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send('Nome e email são obrigatórios');
    }
    const result = await req.db.collection('customers').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.send('Cliente editado com sucesso');
  } catch (error) {
    console.error('Erro ao editar cliente:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
