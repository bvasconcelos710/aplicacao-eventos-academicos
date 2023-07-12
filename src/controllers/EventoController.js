const driver = require('../db/neo4j');
const Evento = require('../models/Evento');

const getForm = async (req, res) => {

    res.locals.mode = 'create';
    res.render('evento/form.njk');
}

const salvarEvento = async (req, res) => {
    Evento.create(req.body).then(result => {
        driver.criarNoEvento(result.titulo, result.id).then(resultado => { res.status(201).redirect("/") })
    }).catch(e => res.status(400).send(e));

    req.flash('info', 'Evento registrado com sucesso.');
}

const listarEventos = async (req, res) => {
    Evento.find({}, { _id: true, __v: false }).then(eventos => {
        res.status(200).render('evento/lista.njk', { eventos });
    }).catch(e => res.status(400).send(e));
}

const buscarEventos = async (req, res) => {
    const texto = JSON.stringify(req.body.texto);
    Evento.find({ $text: { $search: texto } }, { _id: true, __v: false }, { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).then(eventos => {
        res.status(200).render('evento/lista.njk', { eventos });
    }).catch(e => res.status(400).send(e));
}

const getFormEditar = async (req, res) => {
    //console.log(req.params.id);
    res.locals.mode = 'update';
    //const id = JSON.stringify(req.params.id);

    await Evento.findById(req.params.id).then(evento => {
        res.status(200).render('evento/formeditar.njk', { evento });
    }).catch(e => res.status(400).send(e));
}

const editarEventos = async (req, res) => {
    await Evento.findById(req.params.id).then(result => {
        if (result) {
            result.set(req.body);
            result.save();
            res.status(200).redirect('/listar');
        }
    }).catch(e => res.status(404).send('Evento não encontrado'));
}

const apagarEvento = async (req, res) => {
    Evento.deleteOne({ _id: req.params.id }).then(result => {
        if (result.deletedCount > 0) res.status(200).redirect('/listar');
        else res.status(404).send('Anotação não encontrada');
    }).catch(e => res.status(400).send(e));
}

const exibirMapa = async (req, res) => {
    await Evento.findById(req.params.id).then(evento => {
        res.status(200).render('evento/mapa.njk', { evento });
    }).catch(e => res.status(400).send(e));
}

const relacionamentoUserEvento = async (req, res) => {
    const userId = req.params.userid;
    const eventId = req.params.eventid;
    driver.criarRelacionamento(userId, eventId).then(resultado => { res.status(201).redirect("/") }).catch(e => res.status(400).send(e));
}

const buscarEventosUser = async (req, res) => {
    const userId = req.params.id;
    driver.buscarEventosUser(userId).then(results => {
        Evento.find({ _id: { $in: results } }).then(eventos => res.status(200).render('evento/eventosuser.njk', { eventos }));

    }).catch(e => res.status(400).send(e));
}

const eventosRecomendados = async (req, res) => {
    const userId = req.params.id;
    driver.buscarEventosRecomendados(userId).then(results => {
        Evento.find({ _id: { $in: results } }).then(eventos => res.status(200).render('evento/recomendados.njk', { eventos }));
    }).catch(e => res.status(400).send(e));

}



module.exports = {
    getForm, salvarEvento, listarEventos, buscarEventos, editarEventos,
    getFormEditar, apagarEvento, exibirMapa, relacionamentoUserEvento, buscarEventosUser, eventosRecomendados
};