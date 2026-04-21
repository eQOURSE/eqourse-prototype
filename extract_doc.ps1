$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\yobha\Downloads\eQOURSE_EdTech_Solutions_ALL_SubService_Pages.docx")
$doc.Content.Text | Out-File -FilePath "d:\equourse\project1\eqoursedummy-2-main\subservice_content.txt" -Encoding UTF8
$doc.Close()
$word.Quit()
