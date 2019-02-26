$file = '.\PSA Template\node_modules\materialize-css\dist\js\materialize.js'
(Get-Content $file) -replace 'alignments\.spaceOnTop > alignments\.spaceOnBottom', 'false' | Set-Content $file
(Get-Content $file) -replace 'autoFocus: false,', 'autoFocus: false, container: document.body, constrainWidth: false,' | Set-Content $file