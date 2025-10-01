const express = require('express');
const router = express.Router();
let Experiment;
try { Experiment = require('../models/Experiment'); } catch(e){ Experiment = null; }

// GET /api/experiments - list experiments (if no DB, returns empty array)
router.get('/', async (req, res) => {
  if (!Experiment) return res.json({ experiments: [], message: 'No MongoDB model available on server.' });
  try {
    const exps = await Experiment.find().sort({ createdAt: -1 }).limit(50).lean();
    res.json({ experiments: exps });
  } catch (err) {
    console.error('Fetch experiments error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/experiments/:id - get single experiment
router.get('/:id', async (req, res) => {
  if (!Experiment) return res.status(404).json({ error: 'No DB configured' });
  try {
    const exp = await Experiment.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: 'Not found' });
    res.json({ experiment: exp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
