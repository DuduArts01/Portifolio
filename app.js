const express = require('express'); // routing, middleware, view engine support and Request Handling
const morgan = require('morgan');
const Blog = require('./models/blog'); // schema
const mongoose = require('mongoose'); // mongodb
const session = require('express-session'); 
require('dotenv').config(); // .env
const bcrypt = require('bcrypt');

const app = express();
app.set('view engine', 'ejs'); // ejs

// Database Connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => console.log('Connected to Protected DB'))
  .catch((err) => console.log(err));

// --- MIDDLEWARE ---
app.use(express.static('public')); // acess public folder
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Setup - This "remembers" the admin login
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS/SSL later
}));

// Admin Check Middleware
function isAdmin(req, res, next) {
    if (req.session && req.session.isLogged) {
        return next(); 
    }
    res.redirect('/login'); 
}

// --- ROUTES ---

// Login Routes (To access /adm/create)
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' }); 
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user matches your secret .env credentials
    if (username === process.env.ADMIN_USER) {
        // Compares plain text password with hashed password in .env
        const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
        if (match) {
            req.session.isLogged = true; // Create the session
            return res.redirect('/adm/create');
        }
    }
    res.send("Acesso Negado - Credenciais Incorretas");
});

// Protected Route [cite: 2026-02-03]
app.get('/adm/create', isAdmin, (req, res) => {
    res.render('create', { title: 'Novo Projeto' }); 
});

// Logout (Optional but good)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Public Routes [cite: 2026-02-03]
app.get('/', async (req, res) => {
    try {
        const projects = await Blog.find().sort({ createdAt: -1 }).limit(5);
        res.render('index', { projects: projects, title: 'Home' });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Blog.find().sort({ createdAt: -1 });
        res.render('projects', { projects: projects, title: 'Todos os Projetos' });
    } catch (err) {
        res.status(500).send("Error loading projects");
    }
});

app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Blog.findById(req.params.id);
        res.render('details', { project, title: 'Project Details' });
    } catch (err) {
        res.status(404).render('404', { title: 'Not Found' });
    }
});

app.post('/projects', isAdmin, async (req, res) => { // Only admin can save!
    const project = new Blog(req.body);
    try {
        await project.save();
        res.redirect('/projects'); 
    } catch (err) {
        res.status(500).send("Error saving to database");
    }
});

app.get('/about', (req, res) =>{
    res.render('about', { title: 'Sobre'});
});

app.use((req, res) =>{
    res.status(404).render('404', {title: '404'});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});