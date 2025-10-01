import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, PointElement, LineElement, LinearScale, Title, Tooltip } from 'chart.js';
Chart.register(PointElement, LineElement, LinearScale, Title, Tooltip);

export default function PlotScatterLine({ dataset = [], trace = [], frame = 0 }){
  const points = dataset.map(p => ({ x: p.x, y: p.y }));

  const params = (trace && trace.length) ? trace[Math.min(frame, trace.length - 1)] : null;
  const m = params ? params.m : 0;
  const b = params ? params.b : 0;

  const xs = dataset.length ? dataset.map(d=>d.x) : [0, 10];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const line = [{x: minX, y: m*minX + b}, {x: maxX, y: m*maxX + b}];

  const data = {
    datasets: [
      { label: 'Data', data: points, showLine: false, pointRadius: 4 },
      { label: 'Fitted line', data: line, showLine: true, fill: false, pointRadius: 0 }
    ]
  };

  const options = {
    scales: {
      x: { type: 'linear', position: 'bottom' }
    },
    plugins: { legend: { display: true } },
    responsive: true
  };

  return <Scatter data={data} options={options} />;
}
