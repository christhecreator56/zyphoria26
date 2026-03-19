import pypdf
reader = pypdf.PdfReader('Google Gemini.pdf')
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"
with open('pdf_output.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print("done")
