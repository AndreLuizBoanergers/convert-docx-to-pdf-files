const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000; // Você pode escolher outra porta se desejar

// Use o middleware CORS
app.use(cors());

// Caminho para a pasta "EBOOKS"
const directoryPath = path.join(__dirname, 'DOCX');
app.get('/list-docx', (req, res) => {

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o diretório' });
    }

    let pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.docx');
    res.json(pdfFiles);
  });
});

function readdirSync(dir){
  let results = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if(stat.isDirectory()){
      results[file] = readPdfFiles(fullPath);

    }else if(path.extname(file).toLowerCase() === '.docx'){
      
    }
  })
}
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
