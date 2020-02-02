const express = require('express');
const router = express.Router();

const controller = require('../controller/livro.controller')

//router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

router.get('/livro/:id', controller.obterLivros);
router.get('/livro', controller.obterLivros);


module.exports = router;