import express from 'express';
import Address from '../models/address.js';

const router = express.Router();

router.post('/addresses', async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ error: 'Error creating the address' + error });
  }
});

router.get('/addresses', async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the addresses ' + error });
  }
});

export default router;