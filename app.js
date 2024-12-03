const express = require('express');
const app = express();
const PORT = 3000;

const posts = require('./data/posts');

// Importo il router dei post
const postsRouter = require('./routers/posts');

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// Rotta per la bacheca che restituisce i post come JSON
app.get('/bacheca', (req, res) => {
    let filteredPosts = [...posts];

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

    res.json({
        posts: filteredPosts,
        count: filteredPosts.length
    });
});

// Usa il router dei post
app.use('/posts', postsRouter);

// rotta fallback   
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Error 404. Page not found</h1>`)
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
