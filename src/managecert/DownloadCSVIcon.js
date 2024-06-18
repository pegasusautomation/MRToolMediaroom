import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

const DownloadCSVIcon = ({ data, filename }) => {
  const downloadCSV = () => {
    // Extract column headers
    const headers = Object.keys(data[0]);
    // Create CSV content with headers
    const csvContent = [
      headers.join(","), // First row with plain headers
      ...data.map(cert => headers.map(header => cert[header]).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  };

  return (
    <div
      onClick={downloadCSV}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none',
        textAlign: 'center'
      }}
      title="Download Cert Details"
    >
      <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} />
      Cert Report
    </div>
  );
};

export default DownloadCSVIcon;
