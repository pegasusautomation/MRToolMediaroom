import React from "react";

const HomePage = () => {
    return <table className="hopmepage"><br></br><b>To Do</b><br></br><br></br>
    <b>User Story 1 : </b><br></br>
    Need to check the certificate validity with alert mechanism and means to renew and deploy new certificates to all the machines.	A tool to have the consolidated view for the machine certificates and their expiry dates.
    Then with simple click of a button the certificate renewal process can be automated.<br></br>
    1. Create a dashboard to view certificate details which includes Server Name, Certificate Expiry Duration, Certificate Status and Renewal actions
    <br></br>
    2. Identify the servers
    <br></br>
    3. Get the certificate details of server using power shell script
    <br></br>
    4. Post the certificate details to dashboard
    <br></br>
    5. Create alert email mechanism to alert concerned stakeholders about certificate expiry status
    <br></br><br></br>
    <b>User Story 2 : </b>	<br></br>
    Need a dashboard to monitor the status of Mediaroom service with alert mechanism and action to recycle services and IIS	A simple dashboard that gets populated from the server layout showing all the NBLs and service status for various Mediaroom services
    Once there is a view this tool can be used to recycle services and IIS from single machine like EMS server	
    <br></br>
    1. Create a dashboard to view service details <br></br>
    2. Tool to see the service status
    <br></br>
    3. Actions to restart the services by checking their health
    <br></br>
    4. Create alert email mechanism to alert concerned stakeholders about service status
    <br></br><br></br>
    <b>User Story 3 : </b>	<br></br>
    Get server logs on failure to know the root cause for failure to reduce turnaround time of the ticket raised.	Server error logs distribution to be automated.	
    <br></br>
    1. Get the server logs
    <br></br>
    2. Automation script to share logs based on the demand 
    </table>;
};

export default HomePage;
