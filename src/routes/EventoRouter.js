var express = require('express');
var router = express.Router();

const EventoController = require('../controllers/EventoController');

router.get('/form', EventoController.formEventos);

module.exports = router;