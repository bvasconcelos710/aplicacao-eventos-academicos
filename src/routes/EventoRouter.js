var express = require('express');
var router = express.Router();

const middleware = require('../middleware');

const EventoController = require('../controllers/EventoController');
const UserController = require('../controllers/UserController');

router.use(middleware.initLocals);

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

router.get('/formsignup', UserController.formSignUp);
router.get('/formsignin', UserController.formSignIn);
router.get('/signout', UserController.signout);
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);


module.exports = router;