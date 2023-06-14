var express = require('express');
var router = express.Router();

const EventoController = require('../controllers/EventoController');

router.get('/', async (req, res) => {
    res.render('home/index.njk');
});

router.get('/form', EventoController.getForm);
router.post('/create', EventoController.salvarEvento);
router.post('/buscar', EventoController.buscarEventos);
router.get('/listar', EventoController.listarEventos);
router.get('/listar/formeditar/:id', EventoController.getFormEditar);
router.post('/listar/formeditar/editar/:id', EventoController.editarEventos);
router.get('/listar/apagar/:id', EventoController.apagarEvento);
router.get('/listar/mapa/:id', EventoController.exibirMapa);


module.exports = router;