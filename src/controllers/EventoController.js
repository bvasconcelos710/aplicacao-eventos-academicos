const Evento = require('../models/Evento');

const getForm = async (req, res) => {

    res.locals.mode = 'create';
    res.render('evento/form.njk');
}

const salvarEvento = async (req, res) => {
    Evento.create(req.body).then(result => { res.status(201).redirect("/") }).catch(e => res.status(400).send(e));

}

const listarEventos = async (req, res) => {
    Evento.find({}, { _id: true, __v: false }).then(eventos => {
        res.status(200).render('evento/lista.njk', { eventos });
    }).catch(e => res.status(400).send(e));
}





module.exports = { getForm, salvarEvento, listarEventos };