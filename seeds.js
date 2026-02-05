const mongoose = require('mongoose');
const Project = require('./models/blog'); // Adjust if your model file name is different

const dbURI = 'mongodb+srv://portfolio_adm:gTqa6h0uILLcwJrK@portfolio.46fj2ii.mongodb.net/DuduTech?retryWrites=true&w=majority&appName=Portfolio';

const sampleProjects = [
  {
    title: "🚀 Sistema de Engenharia Mauá",
    snippet: "Plataforma de automação para cálculos estruturais.",
    body: "Este projeto resolve problemas complexos de engenharia civil através de uma interface intuitiva...",
    images: ["/images/banner/imt.jpg", "/images/logo/dudutech.png"] // You can add as many as you like!
  },
  
];

mongoose.connect(dbURI)
  .then(async () => {
    console.log('Seed: Conectado com sucesso!');
    await Project.deleteMany({}); // Optional: Clears old data first
    await Project.insertMany(sampleProjects);
    console.log('Dados inseridos! Verifique seu site.');
    mongoose.connection.close();
  })
  .catch(err => console.log('Erro no seed:', err));