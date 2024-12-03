// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();

// invece di app, utilizziamo router per definire le rotte

// index (read)
router.get('/', function (req, res) {
    res.send('Lista dei posts');
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
router.put('/', function (req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del ${postId}`)
})

router.patch('/', function (req, res) {
    const postId = req.params.id;
    res.send(`Modifica del ${postId}`)
})

// destroy (delete)
router.delete('/', function (req, res) {
    const postId = req.params.id;
    res.send(`Cancellazione del ${postId}`);
});


module.exports = router;