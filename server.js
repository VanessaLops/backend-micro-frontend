const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(express.json())

const externalApiUrl = 'https://boasorte.teddybackoffice.com.br/users';


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/users', async (req, res) => {
  const {
    name,
    salary,
    companyValuation,
  } = req.body;

  try {
    const response = await axios.post(externalApiUrl, {
      name,
      salary,
      companyValuation
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message);
    res.status(500).json({
      error: 'Erro ao criar usuário',
      details: error.response ? error.response.data : error.message
    });
  }
});

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(externalApiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consumir a API externa', details: error.message });
  }
});


app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.delete(`${externalApiUrl}/${userId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consumir a API externa', details: error.message });
  }
});


app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const {
    name,
    salary,
    companyValuation,
  } = req.body;

  try {
    
    const response = await axios.put(externalApiUrl + userId, {
      name,
      salary,
      companyValuation,
    });
    res.json(response.data);
  } catch (error) {

    res.status(500).json({ error: 'Erro ao consumir a API externa', details: error.message });
  }
});


app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`${externalApiUrl}/${userId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consumir a API externa', details: error.message });
  }
});




app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
