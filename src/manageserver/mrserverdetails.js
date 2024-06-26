import React, { useState } from "react";
import jsonData from "./mrserverdata.json";
import "../grid.css";
import ConfirmationPopup from "./confirmationpopup";
import "./selectandandcheck.css";

const Mrserverdetails = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("ComputerName");
  const [isFetchingServiceStatus, setIsFetchingServiceStatus] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [computerName, setComputerName] = useState("");
  const [actionType, setActionType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [stoppedServices, setStoppedServices] = useState([]);
  const [selectAllMachines, setSelectAllMachines] = useState(false);

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  const getServiceStatus = () => {
    setIsButtonDisabled(true);
    setIsFetchingServiceStatus(true);
    console.log(isFetchingServiceStatus);
    fetch("/getstatus-service", {
      method: "POST",
      body: null,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        setIsFetchingServiceStatus(false);
        if (!response.ok) {
          throw new Error("Error getting service");
        }
        alert("Service updated successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        setIsFetchingServiceStatus(false);
        console.error("Error getting service:", error.message);
        alert(":(  " + error.message);
      });
  };

  const handleConfirmationSubmit = (message) => {
    switch (actionType) {
      case "Stop":
        handleStop(roleName, computerName, message);
        break;
      case "Start":
        handleStart(roleName, computerName, message);
        break;
      case "Restart":
        handleRestart(roleName, computerName, message);
        break;
      case "StopAll":
        handleStopAll(computerName, message);
        break;
      case "StartAll":
        handleStartAll(computerName, message);
        break;
      case "RestartAll":
        handleRestartAll(computerName, message);
        break;
      case "IISStop":
        handleIISStop(computerName, message);
        break;
      case "IISStart":
        handleIISStart(computerName, message);
        break;
      case "IISRestart":
        handleIISRestart(computerName, message);
        break;
      case "StopSelected":
        handleStopSelected(message);
        break;
      case "StartSelected":
        handleStartSelected(message);
        break;
      case "RestartSelected":
        handleRestartSelected(message);
        break;
      default:
        break;
    }
    setShowConfirmation(false);
  };

  const handleStop = (roleName, computerName, message) => {
    setIsButtonDisabled(true);
    const jsonServiceInfo = JSON.stringify({ roleName, computerName, message });
    fetch("/stop-service", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error stopping service");
        }
        console.log("Service stopped successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error stopping service:", error.message);
      });
  };

  const handleStart = (roleName, computerName, message) => {
    setIsButtonDisabled(true);
    const jsonServiceInfo = JSON.stringify({ roleName, computerName, message });
    fetch("/start-service", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error starting service");
        }
        console.log("Service started successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error starting service:", error.message);
      });
  };

  const handleRestart = (roleName, computerName, message) => {
    setIsButtonDisabled(true);
    const jsonServiceInfo = JSON.stringify({ roleName, computerName, message });
    fetch("/restart-service", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error restarting service");
        }
        console.log("Service restarted successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error restarting service:", error.message);
      });
  };

  const handleStopAll = (computerName, message) => {
    setIsButtonDisabled(true);
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    fetch("/stopall-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error stopping all services");
        }
        console.log("All services stopped successfully.");
        alert("Services stopped successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error stopping all services:", error.message);
      });
  };

  const handleStartAll = (computerName, message) => {
    setIsButtonDisabled(true); // Set action executing state
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    fetch("/startall-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false); // Set action executing state
        if (!response.ok) {
          throw new Error("Error starting all services");
        }
        console.log("All services started successfully.");
        alert("Services started successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false); // Set action executing state
        console.error("Error starting all services:", error.message);
      });
  };

  const handleRestartAll = (computerName, message) => {
    setIsButtonDisabled(true); // Set action executing state
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    fetch("/restartall-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false); // Set action executing state
        if (!response.ok) {
          throw new Error("Error restarting all services");
        }
        console.log("All services restarted successfully.");
        alert("Services restarted successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false); // Set action executing state
        console.error("Error restarting all services:", error.message);
      });
  };

  const handleIISStop = (computerName, message) => {
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    setIsButtonDisabled(true); // Disable the button when execution begins

    fetch("/iisstop-recycle", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false); // Enable the button when execution ends

        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Error stopping IIS service");
          });
        }
        console.log("IIS service stopped successfully.");
        alert("IIS service stopped successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false); // Enable the button if an error occurs
        console.error("Error stopping IIS service:", error.message);
        alert(`Error stopping IIS service: ${error.message}`);
      });
  };

  const handleIISStart = (computerName, message) => {
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    setIsButtonDisabled(true); // Disable the button when execution begins

    fetch("/iisstart-recycle", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false); // Enable the button when execution ends

        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Error starting IIS service");
          });
        }
        console.log("IIS service started successfully.");
        alert("IIS service started successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false); // Enable the button if an error occurs
        console.error("Error starting IIS service:", error.message);
        alert(`Error starting IIS service: ${error.message}`);
      });
  };

  const handleIISRestart = (computerName, message) => {
    const jsonServiceInfo = JSON.stringify({ computerName, message });
    setIsButtonDisabled(true); // Disable the button when execution begins

    fetch("/iisrestart-recycle", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false); // Enable the button when execution ends

        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Error restart IIS service");
          });
        }
        console.log("IIS service restarted successfully.");
        alert("IIS service restarting successfully.");
      })
      .catch((error) => {
        setIsButtonDisabled(false); // Enable the button if an error occurs
        console.error("Error restarting IIS service:", error.message);
        alert(`Error restarting IIS service: ${error.message}`);
      });
  };

  const handleStopSelected = (message) => {
    const jsonServiceInfo = JSON.stringify({ selectedMachines, message });
    console.log("Selected machines:", selectedMachines);
    console.log("Message:", message);

    setIsButtonDisabled(true);
    fetch("/stopselected-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error stopping selected services");
        }
        console.log("Selected services stopped successfully.");
        alert("Selected services stopped successfully.");
        setStoppedServices((prevServices) => [
          ...prevServices,
          ...selectedMachines,
        ]);
        setSelectedMachines([]);
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error stopping selected services:", error.message);
      });
  };

  const handleStartSelected = (message) => {
    const jsonServiceInfo = JSON.stringify({ selectedMachines, message });
    console.log("Selected machines:", selectedMachines);
    console.log("Message:", message);

    setIsButtonDisabled(true);
    fetch("/startselected-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error stopping selected services");
        }
        console.log("Selected services started successfully.");
        alert("Selected services started successfully.");
        setStoppedServices((prevServices) => [
          ...prevServices,
          ...selectedMachines,
        ]);
        setSelectedMachines([]);
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error stopping selected services:", error.message);
      });
  };

  const handleRestartSelected = (message) => {
    const jsonServiceInfo = JSON.stringify({ selectedMachines, message });
    console.log("Selected machines:", selectedMachines);
    console.log("Message:", message);

    setIsButtonDisabled(true);
    fetch("/restartselected-services", {
      method: "POST",
      body: jsonServiceInfo,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsButtonDisabled(false);
        if (!response.ok) {
          throw new Error("Error stopping selected services");
        }
        console.log("Selected services stopped successfully.");
        alert("Selected services stopped successfully.");
        setStoppedServices((prevServices) => [
          ...prevServices,
          ...selectedMachines,
        ]);
        setSelectedMachines([]);
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        console.error("Error stopping selected services:", error.message);
      });
  };
  // const selectAllMachines = () => {
  //   const allMachines = jsonData.map((item) => item.ComputerName);
  //   setSelectedMachines(allMachines);
  // };

  const deselectAllMachines = () => {
    setSelectedMachines([]);
  };

  const getSelectedMachineCount = () => {
    return selectedMachines.length;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleColumnChange = (event) => {
    setSearchColumn(event.target.value);
    setSearchTerm("");
  };

  const handleSelectMachine = (computerName) => {
    setSelectedMachines((prevSelected) =>
      prevSelected.includes(computerName)
        ? prevSelected.filter((name) => name !== computerName)
        : [...prevSelected, computerName]
    );
  };

  // const handleSelectAllMachinesChange = () => {
  //   const allMachineNames = jsonData.map((data) => data.ComputerName);
  //   setSelectAllMachines(!selectAllMachines);
  //   setSelectedMachines(selectAllMachines ? [] : allMachineNames);
  // };

  const filteredData = jsonData.filter((item) => {
    const searchValue = item[searchColumn];
    if (searchValue && Array.isArray(searchValue)) {
      return searchValue.some(
        (role) =>
          role.Status &&
          role.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchValue && typeof searchValue === "string") {
      return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (typeof searchValue === "number" && !isNaN(searchValue)) {
      return searchValue === parseFloat(searchTerm);
    } else {
      return searchValue === searchTerm;
    }
  });
  const handleSelectAllMachinesChange = () => {
    if (selectAllMachines) {
      setSelectedMachines([]);
    } else {
      const filteredMachineNames = filteredData.map((item) => item.ComputerName);
      setSelectedMachines(filteredMachineNames);
    }
    setSelectAllMachines(!selectAllMachines);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "88%",
        overflow: "auto",
      }}
    >
      <caption style={{ fontSize: "25px", marginBottom: "20px" }}>
        SERVERS
      </caption>
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          textAlign: "left",
          paddingLeft: "20px",
        }}
      >
        {filteredData.length > 0 && (
          <select
            value={searchColumn}
            onChange={handleColumnChange}
            style={{ marginRight: "10px" }}
          >
            <option value="ComputerName">ComputerName</option>
            <option value="ServiceStatus">ServiceStatus</option>
          </select>
        )}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ height: "20px", width: "200px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "250px",
          marginBottom: "10px",
        }}
      >
        <button
          id="updateServiceStatusBtn"
          onClick={getServiceStatus}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#6d62a3",
            color: isButtonDisabled ? "orange" : "#fff",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            border: "none",
            width: "135px",
            height: "40px",
            borderRadius: "10px",
            fontSize: "14px",
            marginRight: "190px",
          }}
        >
          {isButtonDisabled ? "Updating Servers" : "Update Servers"}
        </button>
        <button
          id="updateServiceStatusBtn"
          onClick={() => {
            setShowConfirmation(true);
            setActionType("StopSelected");
          }}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#b95d5d",
            color: isButtonDisabled ? "black" : "#fff",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            border: "none",
            width: "110px",
            borderRadius: "5px",
            fontSize: "14px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          {isButtonDisabled ? "Stop Selected" : "Stop Selected"}
        </button>

        <button
          id="updateServiceStatusBtn"
          onClick={() => {
            setShowConfirmation(true);
            setActionType("StartSelected");
          }}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#0cb061",
            color: isButtonDisabled ? "black" : "#fff",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            border: "none",
            width: "110px",
            borderRadius: "5px",
            fontSize: "14px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          {isButtonDisabled ? "Start Selected" : "Start Selected"}
        </button>
        <button
          id="updateServiceStatusBtn"
          onClick={() => {
            setShowConfirmation(true);
            setActionType("RestartSelected");
          }}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#635279",
            color: isButtonDisabled ? "black" : "#fff",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            border: "none",
            width: "110px",
            borderRadius: "5px",
            fontSize: "14px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          {isButtonDisabled ? "Restart Selected" : "Restart Selected"}
        </button>       
        <span
          style={{
            marginRight: "10px",
          }}
        >
          <b>{getSelectedMachineCount()}</b> Servers Selected
        </span>
      </div>
      <br />
      {filteredData.length > 0 && (
        <div style={{ overflow: "auto", maxHeight: "500px",position:"relative"}}>
        <table style={{ width: "94%", marginBottom: "100px" }}>
          <thead style={{ background: "#908fb0" }}>
            <tr>
              <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>
                <label className="checkbox-container">
                  {" "}
                  <input
                    type="checkbox"
                    checked={selectAllMachines}
                    onChange={handleSelectAllMachinesChange}
                    style={{
                      width: "9%",
                      height: "17px",
                      padding: "2px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      marginRight: "9%",
                    }}
                  />
                  Computer Name
                </label>
              </th>
              <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Computer Status</th>
              <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Service Status</th>
              <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>Actions</th>
              <th style={{position:"sticky",top:"0",zIndex:"1",border: "1px solid black",
                      backgroundColor: "#908fb0",}}>IIS Service Recycle</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {/* <td>
                  <input style={{width: "50%",height:"20px",padding: "2px",  cursor: "pointer",border: "1px solid #ccc",backgroundColor: "#fff"}}
                    type="checkbox"
                    checked={selectedMachines.includes(item.ComputerName)}
                    onChange={() => handleSelectMachine(item.ComputerName)}
                  />
                </td> */}
                <td style={{width:"30%"}}>
                  <label className="checkbox-container">
                    {" "}
                    <input
                      style={{
                        width: "10%",
                        height: "15px",
                        padding: "2px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        marginRight: "4%",
                      }}
                      type="checkbox"
                      checked={selectedMachines.includes(item.ComputerName)}
                      onChange={() => handleSelectMachine(item.ComputerName)}
                    />
                    {item.ComputerName}
                  </label>
                </td>
                <td>{item.ComputerStatus}</td>
                <td>
                  {showConfirmation && (
                    <ConfirmationPopup
                      onCancel={handleConfirmationCancel}
                      onConfirm={handleConfirmationSubmit}
                    />
                  )}
                  <ul>
                    {Array.isArray(item.ServiceStatus) &&
                      item.ServiceStatus.map((role, roleIndex) => (
                        <li key={roleIndex}>
                          <strong>Name:</strong> {role.Name}
                          <br />
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              color:
                                role.Status === "Stopped" ? "red" : "green",
                              marginRight: "10px",
                            }}
                          >
                            {role.Status}
                          </span>
                          {role.Status !== "NA" && (
                            <>
                              {role.Status === "Stopped" && (
                                <button
                                  onClick={() => {
                                    setShowConfirmation(true);
                                    setRoleName(role.Name);
                                    setComputerName(item.ComputerName);
                                    setActionType("Start");
                                  }}
                                  disabled={isButtonDisabled} // Disable button based on state
                                  style={{
                                    marginBottom: "5px",
                                    background: isButtonDisabled
                                      ? "#ccc"
                                      : "#0cb061",
                                    color: isButtonDisabled ? "black" : "#fff",
                                    cursor: isButtonDisabled
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                >
                                  {isButtonDisabled ? "Start" : "Start"}
                                </button>
                              )}
                              {role.Status === "Running" && (
                                <>
                                  <button
                                    onClick={() => {
                                      setShowConfirmation(true);
                                      setRoleName(role.Name);
                                      setComputerName(item.ComputerName);
                                      setActionType("Stop");
                                    }}
                                    disabled={isButtonDisabled} // Disable button based on state
                                    style={{
                                      marginBottom: "5px",
                                      background: isButtonDisabled
                                        ? "#ccc"
                                        : "#b95d5d",
                                      color: isButtonDisabled
                                        ? "black"
                                        : "#fff",
                                      cursor: isButtonDisabled
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    {isButtonDisabled ? "Stop" : "Stop"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowConfirmation(true);
                                      setRoleName(role.Name);
                                      setComputerName(item.ComputerName);
                                      setActionType("Restart");
                                    }}
                                    disabled={isButtonDisabled} // Disable button based on state
                                    style={{
                                      marginLeft: "10px",
                                      background: isButtonDisabled
                                        ? "#ccc"
                                        : "#635279",
                                      color: isButtonDisabled
                                        ? "black"
                                        : "#fff",
                                      cursor: isButtonDisabled
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    {isButtonDisabled ? "Restart" : "Restart"}
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                  </ul>
                </td>
                <td>
                {Array.isArray(item.ServiceStatus) &&
                item.ServiceStatus.some(role => role.Name !== "No service found")? (
                  <>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("StopAll");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#b95d5d",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Stop Services" : "Stop Services"}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("StartAll");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#0cb061",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Start Services" : "Start Services"}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("RestartAll");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#635279",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Restart Services" : "Restart Services"}
                  </button>
                  </>
                ) : (
                  "No services available"
                )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("IISStop");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#b95d5d",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Stop IIS" : "Stop IIS"}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("IISStart");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#0cb061",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Start IIS" : "Start IIS"}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setComputerName(item.ComputerName);
                      setActionType("IISRestart");
                    }}
                    disabled={isButtonDisabled} // Disable button based on state
                    style={{
                      marginBottom: "10px",
                      background: isButtonDisabled ? "#ccc" : "#635279",
                      color: isButtonDisabled ? "black" : "#fff",
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {isButtonDisabled ? "Restart IIS" : "Restart IIS"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Mrserverdetails;

// import React, { useState } from "react";
// import jsonData from "./mrserverdata.json";
// import "../grid.css";
// import ConfirmationPopup from "./confirmationpopup";

// const ITEMS_PER_PAGE = 2;

// const Mrserverdetails = ({ userData }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchColumn, setSearchColumn] = useState("ComputerName");
//   // State to handle showing the confirmation dialog
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   // Function to handle canceling the confirmation dialog
//   const handleConfirmationCancel = () => {
//     setShowConfirmation(false);
//   };

//   // Function to handle submitting the confirmation dialog
//   const handleConfirmationSubmit = () => {
//     // Implement your logic here...
//     setShowConfirmation(true); // Hide the confirmation dialog
//   };

//   const handleStop = (roleName, computerName) => {
//     // const { Name } = roleName; // Extract the service name from the role object
//     const jsonServiceInfo = JSON.stringify({ roleName, computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);
//     fetch("/stop-service", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("Service stopped successfully.");
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//       });
//     alert("Service stopped");
//     console.log("Stop action for computer:", roleName);
//   };

//   const handleStopAll = (computerName) => {
//     // const { Name } = roleName; // Extract the service name from the role object
//     const jsonServiceInfo = JSON.stringify({ computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);
//     fetch("/stopall-services", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("All Services stopped successfully.");
//         handleConfirmationSubmit(); // Call handleConfirmationSubmit when the request succeeds
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//       });
//     handleConfirmationSubmit();
//     alert("All Services stopped");
//   };

//   const handleStartAll = (computerName) => {
//     // const { Name } = roleName; // Extract the service name from the role object
//     const jsonServiceInfo = JSON.stringify({ computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);
//     fetch("/startall-services", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("All Services started successfully.");
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//       });
//       handleConfirmationSubmit();
//     alert("All Services started");
//   };

//   const handleRestartAll = (computerName) => {
//     // const { Name } = roleName; // Extract the service name from the role object
//     const jsonServiceInfo = JSON.stringify({ computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);
//     fetch("/restartall-services", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("All Services Restarted successfully.");
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//       });
//       handleConfirmationSubmit();
//     alert("All Services Restarted");
//   };

//   // Other functions like handleStart and handleRestart remain unchanged
//   const handleStart = (roleName, computerName) => {
//     const jsonServiceInfo = JSON.stringify({ roleName, computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);

//     // Add logic to handle stop action
//     fetch("/start-service", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("Service stopped successfully.");
//         // Handle success as needed
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//         // Handle error as needed
//       });
//     alert("service started");
//     console.log("start action for index:", roleName);
//   };

//   const handleRestart = (roleName, computerName) => {
//     const jsonServiceInfo = JSON.stringify({ roleName, computerName }); // Send Name and computerName as JSON data
//     console.log(jsonServiceInfo);

//     // Add logic to handle stop action
//     fetch("/restart-service", {
//       method: "POST",
//       body: jsonServiceInfo,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error stopping service");
//         }
//         console.log("Service stopped successfully.");
//         // Handle success as needed
//       })
//       .catch((error) => {
//         console.error("Error stopping service:", error.message);
//         // Handle error as needed
//       });
//     alert("service restarted");
//     console.log("Restart action for index:", roleName);
//   };
//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     setCurrentPage(1);
//   };

//   const handleColumnChange = (event) => {
//     setSearchColumn(event.target.value);
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   const filteredData = jsonData.filter((item) => {
//     const searchValue = item[searchColumn];

//     if (searchValue && Array.isArray(searchValue)) {
//       return searchValue.some(
//         (role) =>
//           role.Status &&
//           role.Status.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     } else if (searchValue && typeof searchValue === "string") {
//       return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
//     } else if (typeof searchValue === "number" && !isNaN(searchValue)) {
//       return searchValue === parseFloat(searchTerm);
//     } else {
//       return searchValue === searchTerm;
//     }
//   });

//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, jsonData.length);

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         width: "1108px",
//         height: "520px",
//         marginBottom: "10px",
//         overflow: "auto",
//       }}
//     >
//       <caption style={{ fontSize: "30px", marginLeft: "-80px" }}>
//         PLANO SERVERS
//       </caption>
//       <div style={{ alignItems: "center" }}>
//         {filteredData.length > 0 && (
//           <select
//             value={searchColumn}
//             onChange={handleColumnChange}
//             style={{ marginLeft: "220px", width: "120px" }}
//           >
//             <option value="ComputerName">ComputerName</option>
//             <option value="ServiceStatus">ServiceStatus</option>
//           </select>
//         )}
//         <input
//           className="searchstyle"
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           style={{
//             height: "20px",
//             width: "200px",
//             boxSizing: "border-box",
//             marginLeft: "350px",
//           }}
//         />
//       </div>
//       <br />
//       {filteredData.length > 0 && (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gridGap: "15px",
//             overflowY: "inherit",
//             overflowX: "hidden",
//           }}
//         >
//           {filteredData.slice(startIndex, endIndex).map((item, index) => (
//             <div key={index} className="grid-item">
//               <div>
//                 <strong style={{ color: "#154775" }}>Computer Name:</strong>{" "}
//                 {item.ComputerName}
//               </div>
//               <br />
//               <div>
//                 <strong style={{ color: "#154775" }}>Computer Status:</strong>{" "}
//                 {item.ComputerStatus}
//               </div>
//               <br />
//               <div>
//                 {/* Render the confirmation dialog conditionally */}
//                 {showConfirmation && (
//                   <ConfirmationPopup
//                     onCancel={handleConfirmationCancel}
//                     onConfirm={handleConfirmationSubmit}
//                   />
//                 )}
//                 <strong style={{ color: "#154775" }}>Service Status:</strong>
//                 <ul>
//                   {item.ServiceStatus.map((role, roleIndex) => (
//                     <li key={roleIndex}>
//                       <strong>Name:</strong> {role.Name},<br />
//                       <strong>Status:</strong>{" "}
//                       <span
//                         style={{
//                           color: role.Status === "Stopped" ? "red" : "green",
//                           marginRight: "150px",
//                         }}
//                       >
//                         {role.Status}
//                       </span>
//                       {role.Status !== "NA" && (
//                         <>
//                           {role.Status === "Stopped" ? (
//                             <button
//                               onClick={() =>
//                                 handleStart(role.Name, item.ComputerName)
//                               }
//                               style={{
//                                 marginRight: "10px",
//                                 background: "#0cb061",
//                                 padding: "2px",
//                               }}
//                             >
//                               Start
//                             </button>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   handleStop(role.Name, item.ComputerName)
//                                 }
//                                 style={{
//                                   marginRight: "10px",
//                                   background: "#b95d5d",
//                                 }}
//                               >
//                                 Stop
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleRestart(role.Name, item.ComputerName)
//                                 }
//                                 style={{ background: "#635279" }}
//                               >
//                                 Restart
//                               </button>
//                             </>
//                           )}
//                         </>
//                       )}
//                       {/* <br></br>
// <br></br>
// <label style={{ marginRight:'5px' }}><b>Recycle All services</b></label>
// <button onClick={() => handleStopAll(item.ComputerName)} style={{marginLeft: '30px'}}>Stop All</button> */}
//                     </li>
//                   ))}
//                 </ul>
//                 <br></br>
//                 <br></br>
//                 <label style={{ color: "#154775" }}>
//                   <b>Recycle All Services:</b>
//                 </label>
//                 <button
//                   onClick={() => handleStopAll(item.ComputerName)}
//                   style={{ marginLeft: "5px", background: "#b95d5d" }}
//                 >
//                   Stop All
//                 </button>
//                 <button
//                   onClick={() => handleStartAll(item.ComputerName)}
//                   style={{ marginLeft: "5px", background: "#0cb061" }}
//                 >
//                   Start All
//                 </button>
//                 <button
//                   onClick={() => handleRestartAll(item.ComputerName)}
//                   style={{
//                     marginLeft: "5px",
//                     background: "#635279",
//                     width: "85px",
//                     height: "34px",
//                   }}
//                 >
//                   Restart All
//                 </button>
//               </div>
//               {/* <br></br>
// <br></br>
// <label style={{ color: '#154775'}}><b>Recycle All Services:</b></label>
// <button onClick={() => handleStopAll(item.ComputerName)} style={{marginLeft: '10px', background:'#b95d5d'}}>Stop All</button> */}
//               <br />
//             </div>
//           ))}
//         </div>
//       )}
//       <br />
//       <div style={{ textAlign: "center" }}>
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1 || filteredData.length === 0}
//           style={{
//             color:
//               currentPage === 1 || filteredData.length === 0 ? "gray" : "black",
//             cursor:
//               currentPage === 1 || filteredData.length === 0
//                 ? "default"
//                 : "pointer",
//           }}
//         >
//           {"<"}
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages || filteredData.length === 0}
//           style={{
//             color:
//               currentPage === totalPages || filteredData.length === 0
//                 ? "gray"
//                 : "black",
//             cursor:
//               currentPage === totalPages || filteredData.length === 0
//                 ? "default"
//                 : "pointer",
//           }}
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Mrserverdetails;
