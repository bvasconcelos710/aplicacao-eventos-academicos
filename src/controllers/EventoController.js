const formEventos = async (req, res) => {

    res.locals.mode = 'create';
    res.render('evento/form.njk');
}

module.exports = { formEventos };