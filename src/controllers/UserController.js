const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const formSignUp = (req, res) => {
    res.render('users/formsignup.njk');
};

const formSignIn = (req, res) => {
    res.render('users/formsignin.njk');
};

const signout = (req, res) => {
    req.session.destroy();

    res.clearCookie('access_token');
    res.redirect('/');
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
        const newUser = { name, email, password: hash };

        User.create(newUser).then(result => { res.status(201).redirect("/formsignin") }).catch(e => res.status(400).send(e));


        req.flash('info', 'Conta criada com sucesso. Realize seu login.');
    } catch (err) {
        console.error(err);
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(user);
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = await jwt.sign(
                { userId: user.id },
                process.env.SECRET_KEY,
                { expiresIn: 3600 } // 1h
            );

            const tokenBearer = `Bearer ${token}`;

            req.session.user = user;

            res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
            res.set('Authorization', tokenBearer);
            res.redirect('/');
        } else {
            console.log('Senha inválida.');
            req.flash('error', 'Senha inválida. Tente novamente.');
            res.redirect('/signup');
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Usuário não cadastrado. Realize seu cadastro.');
        res.redirect('/signup');
    }
}



module.exports = { formSignUp, formSignIn, signup, signin, signout };