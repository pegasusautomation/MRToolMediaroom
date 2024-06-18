import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import "./Table.css"

function Table() {
    const [certvalue, setValue] = useState([{
        servername: "",
        thumbprint: "",
        noofdays: "",
        status: ""
    }]);

    const [certvalues, setcert] = useState("Cert Created");

    const handleClick = (e) => {
        fetch("http://localhost:5000/")
            .then((res) => res.json())
            .then((jsonRes) => setcert(jsonRes));
        console.log(e);
        alert('Your certificate renewed successfully!');
    };

    useEffect(() => {
        fetch("http://localhost:3001/")
            .then((res) => res.json())
            .then((jsonRes) => setValue(jsonRes));
    }, []);

    useEffect(() => {
        console.log(certvalue);
    }, [certvalue]);

    const DisplayData = certvalue.map(
        (info) => {
            return (
                <tr>
                    <td>{info.servername}</td>
                    <td>{info.thumbprint}</td>
                    <td>{info.noofdays}</td>
                    <td>{info.status}</td>
                    <td><Button variant="contained" onClick={(e) => handleClick(e.preventDefault)}
                        disabled={info.status === "Not Expired"}>Renew</Button></td>
                </tr>
            );
        }
    );

    return (
        <div className="column">
            {/* <h1 className="header">CERTIFICATE DETAILS</h1> */}
            <table className="table">
                <caption className="caption"><b><br></br><br></br>CERTIFICATE DETAILS</b><br></br><br></br><br></br></caption>
                <thead>
                    <tr>
                        <th>Server Name</th>
                        <th>Thumb Print</th>
                        <th>Days to Expire</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    );
}

export default Table;