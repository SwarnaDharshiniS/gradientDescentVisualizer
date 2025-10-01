import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlotScatterLine from '../components/PlotScatterLine';
import Controls from '../components/Controls';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function Visualizer() {
  const [loading, setLoading] = useState(false);
  const [trace, setTrace] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [finalParams, setFinalParams] = useState(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing && trace.length) {
      intervalRef.current = setInterval(() => {
        setFrame((f) => {
          if (f + 1 >= trace.length) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return trace.length - 1;
          }
          return f + 1;
        });
      }, 150);
      return () => clearInterval(intervalRef.current);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [playing, trace]);

  async function runExperiment(options) {
    setLoading(true);
    try {
      const resp = await axios.post('http://localhost:5000/api/gradient-descent', options);
      setTrace(resp.data.trace || []);
      setDataset(resp.data.dataset || []);
      setFinalParams(resp.data.final || null);
      setFrame(0);
      setPlaying(false);
    } catch (err) {
      console.error(err);
      alert('Error running experiment! Check backend console.');
    } finally {
      setLoading(false);
    }
  }

  const lossData = {
    labels: trace.map((t) => t.iter),
    datasets: [{ label: 'MSE Loss', data: trace.map((t) => t.loss), tension: 0.2 }],
  };

  return (
    <div className="page-container">
      <h2>Gradient Descent Visualizer</h2>
      <Controls onRun={runExperiment} loading={loading} />
      <div className="visualizer-layout">
        <div className="visualizer-left">
          <h3>Dataset & Regression (frame {frame})</h3>
          <PlotScatterLine dataset={dataset} trace={trace} frame={frame} />
        </div>
        <div className="visualizer-right">
          <h3>Loss vs Iteration</h3>
          <Line
            data={lossData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
          <div className="final-params">
            <strong>Final params:</strong>
            <pre>{finalParams ? JSON.stringify(finalParams, null, 2) : '—'}</pre>
          </div>
          <div className="controls-row">
            <button className="btn" onClick={() => setPlaying((p) => !p)}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button className="btn" onClick={() => setFrame((f) => Math.max(0, f - 1))}>
              Step Back
            </button>
            <button className="btn" onClick={() => setFrame((f) => Math.min(trace.length - 1, f + 1))}>
              Step Forward
            </button>
            <button className="btn" onClick={() => setFrame(trace.length ? trace.length - 1 : 0)}>
              Jump to End
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
