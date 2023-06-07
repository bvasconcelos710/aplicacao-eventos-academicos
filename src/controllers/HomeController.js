const getHome = async (req, res) => {
    res.render('home/index.njk');
}

module.exports = { getHome };