const express = require('express');
const app = express();
const PORT = 3000;

const posts = require('./posts');

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// Rotta per la bacheca che restituisce i post come JSON
app.get('/bacheca', (req, res) => {
    let filteredPosts = [...posts];


    // uso due if se voglio utilizzare entrambi i parametri (quindi posso entrare in entrambe le condizioni)

    // Filtrare per tag
    if (req.query.tag) {
        filteredPosts = filteredPosts.filter(post =>
            post.tags.includes(req.query.tag)
        );
    }

    // Filtrare per titolo
    if (req.query.title) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(req.query.title.toLowerCase())
        );
    }

    if (filteredPosts.length > 1) {
        res.status(404);
        response = {
            error: 404,
            message: "Non ci sono elementi che rispecchiano la ricerca"
        }
    }

    res.json({
        posts: filteredPosts,
        count: filteredPosts.length
    });
});
// rotta fallback   
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Error 404. Page not found</h1>`)
})

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
