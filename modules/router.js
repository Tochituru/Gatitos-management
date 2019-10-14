const express = require('express');
const path = require('path');
const router = express.Router();
const kittens = require('../api/kittens.js')


//páginas
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../pages/index.html')))

//métodos con el servidor, cliente y api
router.get('/api/kittens', kittens.getKittens);

router.get('/api/kittens/id/:id', kittens.getKittenId);

router.get('/api/kittens/search/', kittens.getKittenName);

router.post('/api/kittens', kittens.postKitten);

router.patch('/api/kittens/id/:id', kittens.patchKitten);

router.delete('/api/kittens/id/:id', kittens.deleteKitten);

module.exports = router;