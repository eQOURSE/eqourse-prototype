Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
$zip = [System.IO.Compression.ZipFile]::OpenRead('d:\equourse\website-prototype(eqourse)\eqourse-prototype\privacy_temp.docx')
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = [xml]$reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w','http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$paragraphs = $xml.SelectNodes('//w:p', $ns)
$text = ''
foreach($p in $paragraphs) {
    $runs = $p.SelectNodes('.//w:r/w:t', $ns)
    $line = ''
    foreach($r in $runs) { $line += $r.InnerText }
    $text += $line + "`r`n"
}
[System.IO.File]::WriteAllText('d:\equourse\website-prototype(eqourse)\eqourse-prototype\privacy_policy_raw.txt', $text, [System.Text.Encoding]::UTF8)
Write-Host "Done - extracted privacy policy"
