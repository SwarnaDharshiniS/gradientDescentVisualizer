const express = require('express');
const router = express.Router();
let Experiment;
try { Experiment = require('../models/Experiment'); } catch(e){ Experiment = null; }

/**
POST /api/gradient-descent
Body JSON example:
{
  "data": [{"x":0,"y":1}, {"x":1,"y":3}],
  "lr": 0.01,
  "iterations": 200,
  "init": { "m": 0, "b": 0 },
  "save": false,
  "seed": 42
}
*/
router.post('/', async (req, res) => {
  const { data, lr = 0.01, iterations = 200, init = {m:0,b:0}, save=false, seed } = req.body;

  const dataset = data && data.length > 0 ? data : generateSynthetic(seed);

  const result = gradientDescentLinear(dataset, lr, iterations, init);

  if (save && Experiment) {
    try {
      const exp = new Experiment({
        createdAt: new Date(),
        params: { lr, iterations, init, seed },
        dataset,
        trace: result.trace,
        final: result.final
      });
      await exp.save();
      result.savedId = exp._id;
    } catch(err){
      console.error('Save error', err);
    }
  }

  res.json(result);
});

module.exports = router;

// helpers
function generateSynthetic(seed){
  let rnd = mulberry32(seed || 12345);
  const pts = [];
  for (let x=0; x<=10; x+=0.5) {
    const noise = (rnd()-0.5) * 2 * 1.5;
    pts.push({x, y: 2*x + 1 + noise});
  }
  return pts;
}

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function gradientDescentLinear(data, lr, iterations, init) {
  let m = init && typeof init.m === 'number' ? init.m : 0;
  let b = init && typeof init.b === 'number' ? init.b : 0;
  const n = data.length;
  const trace = [];

  for (let iter=0; iter<iterations; iter++){
    let dm = 0, db = 0, loss = 0;
    for (let i=0;i<n;i++){
      const x = data[i].x, y = data[i].y;
      const pred = m*x + b;
      const err = pred - y;
      dm += (2/n) * err * x;
      db += (2/n) * err;
      loss += (err*err) / n;
    }
    m = m - lr * dm;
    b = b - lr * db;

    trace.push({ iter, m, b, loss });
  }

  return {
    trace,
    final: { m, b, loss: trace.length ? trace[trace.length-1].loss : null },
    dataset: data
  };
}
