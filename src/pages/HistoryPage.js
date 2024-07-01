import React, { useState, useEffect } from 'react';
import jsonData from './UserLogonevents.json';

const HistoryPage = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sortData = () => {
      const sorted = [...jsonData].sort((a, b) => {
        if (!a.Timelog) return 1;
        if (!b.Timelog) return -1;

        const dateA = new Date(a.Timelog);
        const dateB = new Date(b.Timelog);

        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      setSortedData(sorted);
    };

    sortData();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ margin: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%'}}>
      <caption style={{ fontSize: '20px', marginBottom: '2px' }}>
        USER EVENT LOGS
      </caption>
      <br />
      <div style={{ overflow: 'auto', maxWidth: '100vw', minWidth: '57vw', maxHeight: '75vh', position: 'relative'}}>
        <table style={{ height: '300px', overflowY: 'inherit'}}>
          <thead style={{ background: '#908fb0', height: '30px' }}>
            <tr>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0'}}>
                Event Time{' '}
                <span style={{ cursor: 'pointer' }} onClick={toggleSortOrder}>
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              </th>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0' }}>User</th>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0' }}>Server</th>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0' }}>Service</th>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0' }}>Action</th>
              <th style={{ position: 'sticky', top: '0', zIndex: '1', border: '1px solid black', backgroundColor: '#908fb0' }}>Activity History</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <span >{formatDate(item.Timelog)}</span>{' '}
                  <span style={{ color: 'orange' }}>{formatTime(item.Timelog)}</span>
                </td>
                <td>{item.User}</td>
                <td style={{ maxWidth: '200px' }}>{item.Machine}</td>
                <td>{item.Service}</td>
                <td>{item.Action}</td>
                <td>{item.ActionHistory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer style={{marginTop:"5px",textAlign:"center"}}>
        <small>&copy; Copyright 2024, MRToolMediaroom</small>
      </footer>
    </div>
    
  );
};

export default HistoryPage;
