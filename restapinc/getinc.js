const axios = require('axios');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

const url = "https://dev347129.service-now.com/api/now/table/incident?sysparm_query=caller_id%3DNULL&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_limit=100";

//AUTENTICATION
const username = 'your user name';
const password = 'your passwor';

// Converte usuário e senha para base64 para o header Authorization
const auth = Buffer.from(`${username}:${password}`).toString('base64');

// Define o caminho completo do arquivo CSV
const outputPath = path.join('C:', 'Users', 'ssant', 'Desktop', 'GitHub', 'restapi-projects', 'restapinc', 'resultado.csv');

axios.get(url, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${auth}`
  }
})
.then(response => {
  console.log('Status:', response.status);
  
  const incidents = response.data.result;
  
  if (incidents.length === 0) {
    console.log('Nenhum incidente encontrado.');
    return;
  }

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(incidents);

  fs.writeFileSync(outputPath, csv);

  console.log(`Arquivo CSV criado: ${outputPath}`);
})
.catch(error => {
  if (error.response) {
    console.error('Erro na resposta:', error.response.status, error.response.data);
  } else {
    console.error('Erro na requisição:', error.message);
  }
  
});













