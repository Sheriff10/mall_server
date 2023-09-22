const express = require('express');
const router = express.Router();
const { Recharge } = require('../model/recharge');

// Route to get all pending recharges
router.get('/', async (req, res) => {
  try {
    // Find all pending recharges where a specific condition is met (e.g., not processed)
    const pendingRecharges = await Recharge.find({pending: true });

    res.status(200).json(pendingRecharges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
