// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();
// importo file data posts
const posts = require('../data/posts');

// invece di app, utilizziamo router per definire le rotte

// index (read)
router.get('/bacheca', (req, res) => {
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

// show (read)
router.get('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Dettagli del ${postId}`);
});

// store (create)
router.post('/', function (req, res) {
    res.send('Creazione nuovo post');
});

// update (update or modify)
router.put('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del ${postId}`)
})

router.patch('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Modifica del ${postId}`)
})

// destroy (delete)
router.delete('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Cancellazione del ${postId}`);
});


module.exports = router;