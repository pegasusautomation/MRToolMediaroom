import React from "react";
import jsonData from './UserLogonevents.json';

const HistoryPage = () => {
    return (
    <div style={{margin:'20px', display: "flex",
    flexDirection: "column",
    alignItems: "center", // Align items to the center
    width: "95%",
    height: "80%",}}>
      <caption style={{ fontSize: "30px", marginBottom: "2px"}}>
        USER EVENT LOGS
      </caption>
      <br></br>
      <div style={{ overflow: "auto",  maxWidth: "100vw", minWidth: "57vw",maxHeight: "70vh",position:"relative" }}>
      <table style={{ height: "300px", overflowY: "inherit" }}>
        <thead style={{ background: "#908fb0" ,height:'30px'}}>
          <tr>
            <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Event Time</th>
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
          {jsonData.map((item, index) => (
            <tr key={index}>
              <td>{item.Timelog}</td>
              <td>{item.User}</td>
              <td>{item.Machine}</td>
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

