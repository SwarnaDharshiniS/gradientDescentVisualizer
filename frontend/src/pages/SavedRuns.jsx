import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SavedRuns() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const resp = await axios.get('http://localhost:5000/api/experiments');
      setList(resp.data.experiments || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching experiments. Is backend connected to MongoDB?');
    } finally {
      setLoading(false);
    }
  }

  async function loadExperiment(id) {
    try {
      const resp = await axios.get(`http://localhost:5000/api/experiments/${id}`);
      setSelected(resp.data.experiment);
    } catch (err) {
      console.error(err);
      alert('Failed to load experiment');
    }
  }

  return (
    <div className="page-container">
      <h2>Saved Experiments</h2>
      <button className="btn" onClick={fetchList} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      <div className="saved-layout">
        <div className="saved-list">
          <h3>List</h3>
          {list.length === 0 ? (
            <p>No saved experiments found.</p>
          ) : (
            <ul>
              {list.map((exp) => (
                <li key={exp._id} className="saved-item">
                  <strong>{new Date(exp.createdAt).toLocaleString()}</strong>
                  <div>LR: {exp.params?.lr} | Iterations: {exp.params?.iterations}</div>
                  <button className="btn small" onClick={() => loadExperiment(exp._id)}>
                    Load
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="saved-details">
          <h3>Selected</h3>
          {selected ? (
            <pre>{JSON.stringify(selected, null, 2)}</pre>
          ) : (
            <p>No experiment loaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
