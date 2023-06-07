var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('evento/form.njk');
})

module.exports = router;