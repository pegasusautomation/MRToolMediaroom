param (
    [string]$ComputerNames,  # Accept a single string of comma-separated computer names
    [string]$Message  # Accept the message as a parameter
)

# Convert the comma-separated string to an array
$ComputerNamesArray = $ComputerNames -split ','

# Check if the computer names are provided
if (-not $ComputerNamesArray) {
    Write-Host "Error: Computer names not provided."
    exit 1
}

# Check if the message is provided
if (-not $Message) {
    Write-Host "Error: Message not provided."
    exit 1
}

# Define the script block to stop services and get their statuses
$stopServiceScriptBlock = {
    param($serviceName)
    Restart-Service -Name $serviceName
    Start-Sleep -Seconds 5
    Get-Service -Name $serviceName
}

# Path to the JSON file
$jsonPath = "C:\Mediaroom\src\manageserver\mrserverdata.json"

# Read the JSON file
$jsonContent = Get-Content -Path $jsonPath -Raw
$data = $jsonContent | ConvertFrom-Json

# Path to the log JSON file
$logFilePath = "C:\Mediaroom\src\pages\UserLogonevents.json"

# Read existing log file content
if (Test-Path $logFilePath) {
    $existingLog = Get-Content -Path $logFilePath -Raw | ConvertFrom-Json
    if ($existingLog -isnot [array]) {
        $existingLog = @($existingLog)
    }
} else {
    $existingLog = @()
}

# Iterate through each specified computer
foreach ($ComputerName in $ComputerNamesArray) {
   # Function to get domain-specific username
function Get-Username {
    param (
        [string]$ComputerName
    )
    # Determine the domain based on the computer name
    if ($ComputerName -like "MSPBR5*") {
        return "MSPBR5\$($env:USERNAME)"
    } elseif ($ComputerName -like "MSPBE5*") {
        return "MSPBE5\$($env:USERNAME)"
    } else {
        return "$($env:USERDOMAIN)\$($env:USERNAME)"
    }
}

$username = Get-Username -ComputerName $ComputerName

    $password = 'Password1!' | ConvertTo-SecureString -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential($username, $password)

    # Find the entry for the specified computer
    $computerEntry = $data | Where-Object { $_.ComputerName -eq $ComputerName }

    if (-not $computerEntry) {
        Write-Host "Error: No entry found for computer: $ComputerName"
        continue
    }

    # Loop through each service in the ServiceStatus array and update its status
    foreach ($service in $computerEntry.ServiceStatus) {
        $serviceName = $service.Name
        $serviceResult = Invoke-Command -ComputerName $ComputerName -Credential $credential -ScriptBlock $stopServiceScriptBlock -ArgumentList $serviceName
        $service.Status = $serviceResult.Status
        Write-Host "Updated status for service: $serviceName on $ComputerName to $($serviceResult.Status)"  # Debugging output

        
    }
	
}
# Prepare log data
        $currentDate = Get-Date
        $logEntry = @{
            Timelog = $currentDate.ToString("yyyy-MM-dd HH:mm:ss")
            User = $username
            Machine = "GroupOFMachines"
            Service = "AdminService /action=Restart"
            Action = "Restarted"
            ActionHistory = $Message
        }

        # Append the new log entry
        $existingLog += $logEntry
# Convert the updated data back to JSON
$jsonUpdated = $data | ConvertTo-Json -Depth 100

# Output the updated JSON for debugging
Write-Host "Updated JSON:"
$jsonUpdated

# Write the updated JSON back to the file
$jsonUpdated | Set-Content -Path $jsonPath -Encoding UTF8
Write-Host "JSON file updated with service statuses for all specified computers."

# Convert the updated log entries back to JSON
$updatedLogJson = $existingLog | ConvertTo-Json -Depth 100

# Write the updated log JSON back to the file
$updatedLogJson | Set-Content -Path $logFilePath -Encoding UTF8
Write-Host "Log JSON file updated with new entries."