$mainDirectory = ($MyInvocation.MyCommand.Path).replace("\src\mrcertdetails.ps1","")
$roleTypeXmlFilePath = "$mainDirectory\Roles.xml"
$roleDescriptionsXml = [xml](Get-Content $roleTypeXmlFilePath) 

$roleTypeXmlFilePath_A = "$mainDirectory\ARoles.xml"
$roleDescriptionsXml_A = [xml](Get-Content $roleTypeXmlFilePath_A) 
 
$roleDescriptions = @{}
foreach ($role in $roleDescriptionsXml.SelectNodes("//machineRole")) {
    $roleName = $role.SelectSingleNode("@role").Value
    $roleType = $role.SelectSingleNode("@type").Value
    $roleDescriptions[$roleName] = @{
        "Type" = $roleType
    }
}

$roleDescriptions_A = @{}
foreach ($role in $roleDescriptionsXml_A.SelectNodes("//machineRole")) {
    $roleName = $role.SelectSingleNode("@role").Value
    $roleType = $role.SelectSingleNode("@type").Value
    $roleDescriptions_A[$roleName] = @{
        "Type" = $roleType
    }
}

$xmlFilePath = "$mainDirectory\serverLayout.xml"
$xml = [xml](Get-Content $xmlFilePath)

$xmlFilePath_A = "$mainDirectory\AserverLayout.xml"
$xml_A = [xml](Get-Content $xmlFilePath_A)

# Read domain info JSON file content
$jsonContent = Get-Content -Raw -Path "$mainDirectory\config\domain.json"

# Convert domain name content to PowerShell object
$jsonObject = $jsonContent | ConvertFrom-Json

$certDetailsArray = @()

# Refers to B server layout
foreach ($branch in $xml.SelectNodes("//branch")) {
    # $branchName = $branch.SelectSingleNode("@name").Value
    foreach ($zone in $branch.SelectNodes(".//zone")) {
        # $zoneName = $zone.SelectSingleNode("@name").Value
        foreach ($computer in $zone.SelectNodes(".//computer")) {
            $computerName = $computer.SelectSingleNode("@name").Value
            Write-Output($computerName)		
            # Get service name based on computer name
            $domain = $jsonObject.Branch
            $username = "$($jsonObject.Branch)\Raghavendra.Gandanah"
            # $username = 'MSPBR5\Raghavendra.Gandanah'
            $password = 'Password1!' | ConvertTo-SecureString -AsPlainText -Force
            $credential = New-Object System.Management.Automation.PSCredential($username, $password)
            $remoteComputer = "$computerName.$domain.MRSUPP.COM"
            $Servicename = $serviceName

            $scriptBlock = {
                Get-ChildItem -Path Cert:\LocalMachine\My
            }

            $personalCertificates = Invoke-Command -ComputerName $remoteComputer -Credential $credential -ScriptBlock $scriptBlock

                        
            if ($personalCertificates) {
                # Create an array to store certificate details

                # Loop through each certificate
                foreach ($cert in $personalCertificates) {
                    # Check if the certificate is not null
                    if ($cert -ne $null) {
                        # Retrieve the Subject Key Identifier extension
                        $skiExtension = $cert.Extensions | Where-Object { $_.Oid.Value -eq "2.5.29.14" }
                        if ($skiExtension) {
                            $ski = $skiExtension.Format(0)
                        }
                        else {
                            $ski = "Not available"
                        }

                        # Attempt to fetch all extensions in the certificate for debugging
                        $certificateExtensions = $cert.Extensions | ForEach-Object {
                            [PSCustomObject]@{
                                "Oid"          = $_.Oid.Value
                                "FriendlyName" = $_.Oid.FriendlyName
                                "Format"       = $_.Format(0)
                            }
                        }

                        Write-Host "Certificate Extensions:"
                        $certificateExtensions | Format-Table  # Debug output

                        # Attempt to fetch the template information from the certificate properties
                        $templateInfo = "Template information not found"
                        if ($cert -is [System.Security.Cryptography.X509Certificates.X509Certificate2]) {
                            $templateExtension = $cert.Extensions | Where-Object { $_.Oid.FriendlyName -eq "Certificate Template Information" }
                            if ($templateExtension) {
                                $templateInfo = $templateExtension.Format(0)
                            }
                            else {
                                Write-Host "Template extension not found for certificate: $($cert.Subject)"
                                $cert.Extensions | ForEach-Object {
                                    Write-Host "Extension: $($_.Oid.FriendlyName)"
                                }
                            }
                        }

                        # Define the desired column order
                        $columnOrder = "Computer Name", "Issued By", "Issued To", "Valid From", "Valid To", "Subject Key Identifier", "Template Information"

                        # Create a custom object to store certificate details in the desired order
                        $certDetailsObject = [PSCustomObject]@{
                            "Computer Name"          = $computerName
                            "Issued To"              = $cert.Subject
                            "Issued By"              = $cert.Issuer
                            "Valid From"             = $cert.NotBefore.ToString("yyyy-MM-dd HH:mm:ss tt")
                            "Valid To"               = $cert.NotAfter.ToString("yyyy-MM-dd HH:mm:ss tt")
                            "Subject Key Identifier" = $ski -replace "\s", ""
                            "Template Information"   = $templateInfo
                        } | Select-Object -Property $columnOrder

                        # Add the custom object to the array
                        $certDetailsArray += $certDetailsObject
                    }
                }
            }
        }
    }
}

# Refers to A server layout
foreach ($branch in $xml_A.SelectNodes("//branch")) {
    # $branchName = $branch.SelectSingleNode("@name").Value
    foreach ($zone in $branch.SelectNodes(".//zone")) {
        # $zoneName = $zone.SelectSingleNode("@name").Value
        foreach ($computer in $zone.SelectNodes(".//computer")) {
            $computerName = $computer.SelectSingleNode("@name").Value
            Write-Output($computerName)		
            # Get service name based on computer name
            $domain = $jsonObject.Aquasition
            $username = "$($jsonObject.Aquasition)\Raghavendra.Gandanah"
            # $username = 'MSPBR5\Raghavendra.Gandanah'
            $password = 'Password1!' | ConvertTo-SecureString -AsPlainText -Force
            $credential = New-Object System.Management.Automation.PSCredential($username, $password)
            $remoteComputer = "$computerName.$domain.MRSUPP.COM"
            $Servicename = $serviceName

            $scriptBlock = {
                Get-ChildItem -Path Cert:\LocalMachine\My
            }

            $personalCertificates = Invoke-Command -ComputerName $remoteComputer -Credential $credential -ScriptBlock $scriptBlock

                        
            if ($personalCertificates) {
                # Create an array to store certificate details

                # Loop through each certificate
                foreach ($cert in $personalCertificates) {
                    # Check if the certificate is not null
                    if ($cert -ne $null) {
                        # Retrieve the Subject Key Identifier extension
                        $skiExtension = $cert.Extensions | Where-Object { $_.Oid.Value -eq "2.5.29.14" }
                        if ($skiExtension) {
                            $ski = $skiExtension.Format(0)
                        }
                        else {
                            $ski = "Not available"
                        }

                        # Attempt to fetch all extensions in the certificate for debugging
                        $certificateExtensions = $cert.Extensions | ForEach-Object {
                            [PSCustomObject]@{
                                "Oid"          = $_.Oid.Value
                                "FriendlyName" = $_.Oid.FriendlyName
                                "Format"       = $_.Format(0)
                            }
                        }

                        Write-Host "Certificate Extensions:"
                        $certificateExtensions | Format-Table  # Debug output

                        # Attempt to fetch the template information from the certificate properties
                        $templateInfo = "Template information not found"
                        if ($cert -is [System.Security.Cryptography.X509Certificates.X509Certificate2]) {
                            $templateExtension = $cert.Extensions | Where-Object { $_.Oid.FriendlyName -eq "Certificate Template Information" }
                            if ($templateExtension) {
                                $templateInfo = $templateExtension.Format(0)
                            }
                            else {
                                Write-Host "Template extension not found for certificate: $($cert.Subject)"
                                $cert.Extensions | ForEach-Object {
                                    Write-Host "Extension: $($_.Oid.FriendlyName)"
                                }
                            }
                        }
                        # Define the desired column order
                        $columnOrder = "Computer Name", "Issued By", "Issued To", "Valid From", "Valid To", "Subject Key Identifier", "Template Information"

                        # Create a custom object to store certificate details in the desired order
                        $certDetailsObject = [PSCustomObject]@{
                            "Computer Name"          = $computerName
                            "Issued To"              = $cert.Subject
                            "Issued By"              = $cert.Issuer
                            "Valid From"             = $cert.NotBefore.ToString("yyyy-MM-dd HH:mm:ss tt")
                            "Valid To"               = $cert.NotAfter.ToString("yyyy-MM-dd HH:mm:ss tt")
                            "Subject Key Identifier" = $ski -replace "\s", ""
                            "Template Information"   = $templateInfo
                        } | Select-Object -Property $columnOrder

                        # Add the custom object to the array
                        $certDetailsArray += $certDetailsObject
                    }
                }

            }
        }
    }
}

$updatedJsonString = $certDetailsArray | ConvertTo-Json -Depth 100
# Specify the file path where you want to save the JSON data
$filePath = "$mainDirectory\src\managecert\certdata.json"
# # # Write the JSON data to a file
$updatedJsonString | Out-File -FilePath $filePath -Encoding UTF8
Write-Host "JSON file created: $jsonOutputFilePath"