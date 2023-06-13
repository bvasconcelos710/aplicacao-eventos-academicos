var express = require('express');
var router = express.Router();

const EventoController = require('../controllers/EventoController');

router.get('/form', EventoController.getForm);
router.post('/create', EventoController.salvarEvento);
router.get('/listar', EventoController.listarEventos);

module.exports = router;