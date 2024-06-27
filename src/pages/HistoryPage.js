import React, { useState,useEffect } from 'react';
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
    return (
    <div style={{margin:'20px', display: "flex",
    flexDirection: "column",
    alignItems: "center", // Align items to the center
    width: "98%",
    height: "100%",}}>
      <caption style={{ fontSize: "25px", marginBottom: "2px"}}>
        USER EVENT LOGS
      </caption>
      <br></br>
      <div style={{ overflow: "auto",  maxWidth: "100vw", minWidth: "57vw",maxHeight: "70vh",position:"relative" }}>
      <table style={{ height: "300px", overflowY: "inherit" }}>
        <thead style={{ background: "#908fb0" ,height:'30px'}}>
          <tr>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Event Time{' '}
                      <span style={{ cursor: 'pointer' }} onClick={toggleSortOrder}>
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </span></th>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>User</th>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Server</th>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Service</th>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Action</th>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Activity History</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td style={{width:"200px"}}>{item.Timelog}</td>
              <td>{item.User}</td>
              <td style={{maxWidth:"200px"}}>{item.Machine}</td>
              <td>{item.Service}</td>
              <td>{item.Action}</td>
              <td>{item.ActionHistory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default HistoryPage;

