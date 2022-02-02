const crypto = require('crypto');
const User = require('../models/user');


const controller = {};

controller.addUser = (req, res) => {
    res.render('auth/signup');
};

controller.saveUser = async (req, res)  => {
    const { email, password } = req.body
    const countUsers = await User.count({})
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) =>{
            const encryptedPassword = key.toString('base64');
            if(countUsers == 0) {
                let role = 'admin'            
                createUser(email, encryptedPassword, newSalt, role); 
                return res.redirect('/auth/login');
            };
            User.findOne({email})
            .then(user => {
                    if (user) {
                        return res.redirect('/auth/register');
                    }
                    let role = 'client';
                    createUser(email, encryptedPassword, newSalt, role);
                    res.redirect('/auth/login');
                });
        });
    });
};

const createUser = (email, encryptedPassword, newSalt, role) => {
    User.create({
        email,
        password: encryptedPassword,
        salt: newSalt,
        role
    });
    
};

controller.login = (req, res) => {
    res.render('auth/login');
};

controller.authenticate = (req, res)  => {
    const { email, password} = req.body
    User.findOne({email}).then(user =>{
        if (!user) {
            return res.redirect('/auth/login');
        };
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) =>{
            const encryptedPassword = key.toString('base64')
            if (user.password === encryptedPassword) {
                req.session.isAuth = true;
                req.session.role = user.role;
                req.session.userId = user._id;
                return res.redirect('/');
            };
            res.redirect('/auth/login');
        });
    });
};

controller.logout =(req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            return res.send(err);
        };   
        res.redirect('/');
    });
};

module.exports = controller