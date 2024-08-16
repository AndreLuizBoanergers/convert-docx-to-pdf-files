const axios =  require('axios');
const fs = require('fs').promises;
const path = require('path');
const  libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

async function main(docx){
	const ext = '.pdf';
	const inputPath = path.join(__dirname, `./DOCX/${docx}`);
	const outputPath = path.join(__dirname, `./PDFEXAMPLE/${docx.split(".")[0]}${ext}`);

	const docxBuf = await fs.readFile(inputPath);
	let  pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

	await fs.writeFile(outputPath, pdfBuf);

}

async  function  getDocsList(){
	const  response = await axios.get('http://127.0.0.1:3000/list-docx');
	return response.data;
}




async function init(){
	const lista = await getDocsList()
	for(let docx of lista){
		console.log(`Convertendo => ${docx}`)
		await main(docx);
		console.log(`Convertido com successo => ${docx}`)
	}

}
init()
