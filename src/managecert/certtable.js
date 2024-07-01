import React, { useState, useEffect } from "react";
import certTable from "./certdata.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Certtable = ({ userData }) => {
  const [selectedComputer, setSelectedComputer] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [expirationFilter, setExpirationFilter] = useState("all");

  const uniqueComputerNames = ["All", ...Array.from(
    new Set(certTable.map((item) => item["Computer Name"]))
  )];

  useEffect(() => {
    if (selectedComputer === "") {
      setSelectedComputer("All");
    }
  }, [selectedComputer]);

  const filteredDetails = selectedComputer !== "All"
    ? certTable.filter((item) => item["Computer Name"] === selectedComputer)
    : certTable;

  const currentDate = new Date();

  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [hoursMinutes, ampm] = timePart.split(' ');
    const [hours, minutes, seconds] = hoursMinutes.split(':');
    const adjustedHours = ampm === 'PM' && parseInt(hours, 10) !== 12
      ? parseInt(hours, 10) + 12
      : ampm === 'AM' && parseInt(hours, 10) === 12
      ? 0
      : parseInt(hours, 10);
    const formattedDate = `${datePart}T${String(adjustedHours).padStart(2, '0')}:${minutes}:${seconds}`;
    return new Date(formattedDate);
  };

  const filteredExpiration = filteredDetails.filter((item) => {
    const expirationDate = parseDate(item["Valid To"]);
    const daysUntilExpiration = Math.floor((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

    if (expirationFilter === "7days" && daysUntilExpiration <= 7 && daysUntilExpiration > 0) {
      return true;
    }
    if (expirationFilter === "30days" && daysUntilExpiration <= 30 && daysUntilExpiration > 0) {
      return true;
    }
    if (expirationFilter === "expired" && expirationDate < currentDate) {
      return true;
    }
    return expirationFilter === "all";
  });

  const sortedDetails = filteredExpiration.slice().sort((a, b) => {
    const dateA = parseDate(a["Valid To"]);
    const dateB = parseDate(b["Valid To"]);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const isExpired = (dateString) => {
    const expirationDate = parseDate(dateString);
    return expirationDate < currentDate;
  };

  const handleSelectComputer = (event) => {
    setSelectedComputer(event.target.value);
  };

  const handleExpirationFilter = (event) => {
    setExpirationFilter(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const downloadAsCSV = () => {
    if (sortedDetails.length === 0) {
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(sortedDetails[0]).join(",") + "\n" +
      sortedDetails.map(row => {
        return Object.values(row)
          .map(value => {
            if (typeof value === 'string' && value.includes(',')) {
              return `"${value}"`;
            }
            return value;
          })
          .join(",");
      })
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "certificates.csv");
    document.body.appendChild(link);
    link.click();
  };

  const noCertificatesMessage = (
    <tr>
      <td colSpan={Object.keys(sortedDetails[0] || {}).length} style={{ textAlign: "center", padding:"100px"}}>
        No certificates match the selected expiration filter.
      </td>
    </tr>
  );

  return (
    <div style={{height: "80vh", width: "86vw", minWidth: "57vw", minHeight: "87vh" }}>
      <h1 style={{ fontSize: "20px", marginLeft: "400px", marginBottom: '20px' }}>CERTIFICATE DETAILS</h1>
      <label style={{ marginRight: "20px" }}>
        <b>Select ComputerName</b>
      </label>
      <select
        value={selectedComputer}
        onChange={handleSelectComputer}
        style={{ height: "25px", width: "200px" }}
      >
        {uniqueComputerNames.map((computer, index) => (
          <option key={index} value={computer}>
            {computer}
          </option>
        ))}
      </select>
      <label style={{ marginRight: "20px", marginLeft: "20px" }}>
        <b>Expiration Filter</b>
      </label>
      <select
        value={expirationFilter}
        onChange={handleExpirationFilter}
        style={{ height: "25px", width: "200px" }}
      >
        <option value="all">All</option>
        <option value="7days">Expires in 7 Days</option>
        <option value="30days">Expires in 30 Days</option>
        <option value="expired">Already Expired</option>
      </select>
      <br /><br />
      <button
        onClick={downloadAsCSV}
        disabled={sortedDetails.length === 0}
        style={{
          cursor: sortedDetails.length === 0 ? 'not-allowed' : 'pointer',
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: sortedDetails.length === 0 ? 'gray' : '#4CAF50',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none',
          textAlign: 'left',
          width: '13%'
        }}
        title="Download Cert Details"
      >
        <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} />
        Cert Report
      </button>
      <br /><br />
      <div style={{ overflow: "auto",  maxWidth: "100vw", minWidth: "57vw",maxHeight: "62vh",minHeight:"62vh" }}>
      <table style={{ borderCollapse: "collapse", width: "100%",whiteSpace: "wrap" }}>
        <thead style={{ background: "#908fb0", color: "white" }}>
          <tr>
            {Object.keys(sortedDetails[0] || {}).map((key, index) => (
              <th
                key={index}
                onClick={key === "Valid To" ? toggleSortOrder : null}
                style={{ padding: "2px 2px", border: "1px solid #ddd", cursor: "pointer", fontSize: "12px" }}
              >
                {key}
                {key === "Valid To" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDetails.length > 0 ? (
            sortedDetails.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  color: isExpired(row["Valid To"]) ? "red" : "inherit",
                }}
              >
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td key={cellIndex} style={{ padding: "2px 2px", border: "1px solid #ddd", wordWrap: "break-word", fontSize: "10px", whiteSpace: key === "Template Information" || key === "Issued To" || key === "Subject Key Identifier" ? "pre-wrap" : "nowrap" }}>
                    {key === "Issued By" || key === "Issued To" || key === "Template Information" ? (
                      <>
                        {value.split(',').map((line, index) => (
                          <div key={index}>{line.trim()}</div>
                        ))}
                      </>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            noCertificatesMessage
          )}
        </tbody>
      </table>
      </div>
  <footer style={{marginTop:"2px",textAlign:"center"}}>
    <small>&copy; Copyright 2024, MediaKind</small>
  </footer>
    </div>
  );
};

export default Certtable;
