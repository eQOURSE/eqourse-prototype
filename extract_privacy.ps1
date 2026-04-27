$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\yobha\Downloads\eQOURSE_Privacy_Policy_Complete_Rewrite.docx")
$doc.Content.Text | Out-File -FilePath "d:\equourse\website-prototype(eqourse)\eqourse-prototype\privacy_policy_raw.txt" -Encoding UTF8
$doc.Close()
$word.Quit()
