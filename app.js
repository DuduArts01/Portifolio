const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev')); //or 'dev' change for 'tiny' (more simplify)

/*
morgan replace this
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});
*/

//home
app.get('/', (req, res) =>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', { title: 'Início', blogs});
});


//about
app.get('/about', (req, res) =>{
    res.render('about', { title: 'Sobre'});
});

app.get('/projects', (req, res) =>{
    res.render('projects', { title: 'Projetos'});
});

//404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: '404'});
});
