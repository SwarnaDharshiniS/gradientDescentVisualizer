import React, { useState } from 'react';

export default function Controls({ onRun, loading }){
  const [lr, setLr] = useState(0.01);
  const [iterations, setIterations] = useState(200);
  const [initM, setInitM] = useState(0);
  const [initB, setInitB] = useState(0);
  const [seed, setSeed] = useState(123);
  const [save, setSave] = useState(false);

  function handleRun(e) {
    e.preventDefault();
    const body = {
      lr: Number(lr),
      iterations: Number(iterations),
      init: { m: Number(initM), b: Number(initB) },
      seed: Number(seed),
      save: Boolean(save),
    };
    onRun(body);
  }

  return (
    <form onSubmit={handleRun} className="controls">
      <label>Learning rate (lr)
        <input type="number" step="0.001" value={lr} onChange={e=>setLr(e.target.value)} />
      </label>
      <label>Iterations
        <input type="number" value={iterations} onChange={e=>setIterations(e.target.value)} />
      </label>
      <label>Init m
        <input type="number" step="0.1" value={initM} onChange={e=>setInitM(e.target.value)} />
      </label>
      <label>Init b
        <input type="number" step="0.1" value={initB} onChange={e=>setInitB(e.target.value)} />
      </label>
      <label>Dataset seed
        <input type="number" value={seed} onChange={e=>setSeed(e.target.value)} />
      </label>
      <label style={{alignItems:'center', display:'flex', gap:8}}>
        <input type="checkbox" checked={save} onChange={e=>setSave(e.target.checked)} />
        <span>Save this run to MongoDB</span>
      </label>
      <div>
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Running...' : 'Run Gradient Descent'}</button>
      </div>
    </form>
  );
}
