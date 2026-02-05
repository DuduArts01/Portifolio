const express = require('express');
const morgan = require('morgan');
const Project = require('./models/blog'); 
const mongoose = require('mongoose');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// Ensure this matches your latest cluster code: 46fj2ii
const dbURI = 'mongodb+srv://portfolio_adm:5umJjgeAzrUDAml9@portfolio.46fj2ii.mongodb.net/DuduTech';

mongoose.connect(dbURI)
  .then((result) => {
    console.log('Conectado ao Banco de Dados!');
    // The server only starts after the DB is ready
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => console.log('Erro na conexão:', err));

// STANDALONE app.listen(3000) REMOVED to avoid port conflict

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev')); 

// home route
app.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).limit(5);
        res.render('index', { projects: projects, title: 'Início' }); 
    } catch (err) {
        console.error(err);
        res.render('index', { projects: [], title: 'Início' }); 
    }
});

// about route
app.get('/about', (req, res) =>{
    res.render('about', { title: 'Sobre'});
});

// projects route
app.get('/projects', (req, res) =>{
    res.render('projects', { title: 'Projetos'});
});

// 404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: '404'});
});