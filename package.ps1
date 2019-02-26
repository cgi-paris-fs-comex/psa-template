Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceFolder = "PSA Template"
$tempFolder = "temp"
$targetFile = "psa-template.zip"

function Get-Files {
	Param ([string] $path)
	return Get-ChildItem -Recurse -Path $path
}

$files = New-Object System.Collections.Generic.List[System.Object]

foreach ($path in Get-Content files.txt) {
	foreach ($file in Get-Files($sourceFolder + $path)) {
		$files.Add($file)
	}
}

foreach ($file in $files) {
	$path = Resolve-Path -relative $file
	$target = $path.Replace($sourceFolder, $tempFolder)
	New-Item -Force $target
	Copy-Item -Recurse -Force $path -Destination $target
}

Remove-Item $targetFile
[io.compression.zipfile]::CreateFromDirectory($tempFolder, $targetFile) 
Remove-Item -Recurse $tempFolder
