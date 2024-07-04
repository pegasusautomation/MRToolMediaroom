# Specify the directory containing the XML files
$xmlDirectoryPath = ($MyInvocation.MyCommand.Path).replace("\src\mrserverdeatils.ps1","")
$xmlFiles = Get-ChildItem -Path $xmlDirectoryPath -Filter "*.xml"

# Read role descriptions from all role XML files dynamically
$roleDescriptions = @{}
$roleDescriptions_A = @{}

foreach ($xmlFile in $xmlFiles) {
    if ($xmlFile.Name -like "*Roles.xml") {
        $roleDescriptionsXml = [xml](Get-Content $xmlFile.FullName)
        foreach ($role in $roleDescriptionsXml.SelectNodes("//machineRole")) {
            $roleName = $role.SelectSingleNode("@role").Value
            $roleType = $role.SelectSingleNode("@type").Value
            if ($xmlFile.Name -like "*ARoles.xml") {
                $roleDescriptions_A[$roleName] = @{
                    "Type" = $roleType
                }
            } else {
                $roleDescriptions[$roleName] = @{
                    "Type" = $roleType
                }
            }
        }
    }
}

# Read layout XML files dynamically
$branches = @()
foreach ($xmlFile in $xmlFiles) {
    if ($xmlFile.Name -like "*serverLayout.xml") {
        $xml = [xml](Get-Content $xmlFile.FullName)
        $branches += $xml
    }
}

# Read domain info JSON file content
$jsonContent = Get-Content -Raw -Path "$xmlDirectoryPath\config\domain.json"

# Convert domain name content to PowerShell object
$jsonObject = $jsonContent | ConvertFrom-Json

$extractedData = @()

# Get the currently logged-in username and domain
$currentUsername = $env:USERNAME

function Get-RemoteServiceStatus {
    param (
        [string]$ComputerName,
        [string]$Username,
        [string]$Password
    )
    
    $credential = New-Object System.Management.Automation.PSCredential($username, (ConvertTo-SecureString -String $password -AsPlainText -Force))
    $scriptBlock = {
        Get-Service | Where-Object { $_.Name -like '*Iptv*' -or $_.DisplayName -like '*Iptv*' -or $_.Name -eq 'W3SVC' -or $_.DisplayName -like '*World Wide Web*' }
    }
    
    $services = Invoke-Command -ComputerName "$computerName.$domain.MRSUPP.COM" -Credential $credential -ScriptBlock $scriptBlock
    return $services
}

function Get-ServiceStatus {
    param (
        [string]$ComputerName,
        [PSCredential]$Credential,
        [string[]]$ServiceList
    )

    $serviceStatus = @()
    
    foreach ($serviceName in $ServiceList) {
        try {
            $scriptBlock = {
                param($ServiceName)
                Get-Service -Name $ServiceName
            }

            $service = Invoke-Command -ComputerName $ComputerName -Credential $Credential -ScriptBlock $scriptBlock -ArgumentList $serviceName

            if ($service) {
                $statusString = if ($service.Status -eq 'Running') { 'Running' } else { 'Stopped' }
                $serviceStatus += @{
                    "Name"   = $serviceName
                    "Status" = $statusString
                }
            }
            else {
                $serviceStatus += @{
                    "Name"   = $serviceName
                    "Status" = "Service not found"
                }
            }
        }
        catch {
            $serviceStatus += @{
                "Name"   = $serviceName
                "Status" = "Error: $($_.Exception.Message)"
            }
        }
    }
    
    return $serviceStatus
}

# Define the branches to process and their respective domains
$branches = @()
$domains = @()

foreach ($xmlFile in $xmlFiles) {
    if ($xmlFile.Name -like "*serverLayout.xml") {
        $xml = [xml](Get-Content $xmlFile.FullName)
        $branches += $xml
        # Determine the domain based on the file name pattern
        if ($xmlFile.Name -like "*AserverLayout.xml") {
            $domains += $jsonObject.Aquasition
        } else {
            $domains += $jsonObject.Branch
        }
    }
}

for ($i = 0; $i -lt $branches.Count; $i++) {
    $branch = $branches[$i]
    $domain = $domains[$i]

    foreach ($zone in $branch.SelectNodes("//branch//zone")) {
        foreach ($computer in $zone.SelectNodes(".//computer")) {
            $computerName = $computer.SelectSingleNode("@name").Value
            Write-Output "Processing $computerName in domain $domain"
            
            $username = "$domain\$currentUsername"
            $password = 'Password1!'
            
            $services = Get-RemoteServiceStatus -ComputerName $computerName -Username $username -Password $password

            if ($services.Count -eq 0) {
                $serviceStatus = @(
                    @{
                        "Name" = "No service found"
                        "Status" = "NA"
                    }
                )
            } else {
                $serviceList = $services | Select-Object -ExpandProperty Name
                $credential = New-Object System.Management.Automation.PSCredential($username, (ConvertTo-SecureString -String $password -AsPlainText -Force))
                $serviceStatus = Get-ServiceStatus -ComputerName "$computerName.$domain.MRSUPP.COM" -Credential $credential -ServiceList $serviceList
            }

            try {
                $result = Test-Connection -ComputerName "$computerName.$domain.MRSUPP.COM"
                $serverStatus = if ($result) { "Reachable" } else { "Unreachable" }
            }
            catch {
                $serverStatus = "Error: $($_.Exception.Message)"
            }
            
            $roles = @()
            foreach ($roleNode in $computer.SelectNodes(".//role")) {
                $roleName = $roleNode.SelectSingleNode("@name").Value
                $roleType = if ($domain -eq $jsonObject.Aquasition) { $roleDescriptions_A[$roleName].Type } else { $roleDescriptions[$roleName].Type }
                $roles += @{
                    "Name" = $roleName
                    "Type" = $roleType
                }
            }
            
            $extractedData += @{
                "ComputerName"   = $computerName
                "Roles"          = $roles
                "ComputerStatus" = $serverStatus
                "ServiceStatus"  = $serviceStatus
            }
        }
    }
}

$updatedJsonString = $extractedData | ConvertTo-Json -Depth 5

# Specify the file path where you want to save the JSON data
$filePath = "$xmlDirectoryPath\src\manageserver\mrserverdata.json"
$updatedJsonString | Out-File -FilePath $filePath -Encoding UTF8
Write-Host "JSON file created: $filePath"