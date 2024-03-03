const express = require('express');
const customersRouter = require('./customers');
const ordersRouter = require('./orders');

const router = express.Router();

router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);

module.exports = router;
