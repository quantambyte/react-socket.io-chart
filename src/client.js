import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';

import { Line, LineChart, XAxis, YAxis } from 'recharts';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('cpu', (cpuPercent) => {
      setData((prevValues) => [...prevValues, cpuPercent]);
    });
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Real Time Chart</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Line dataKey='value' stroke='#8884d8' />
      </LineChart>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
