const authorization = {};

authorization.isAuth = (req, res, next) =>{
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/auth/login');
    };
};

authorization.isAdmin = (req, res, next) =>{
    if (req.session.role == 'admin') {
        next();
    } else {
        res.send("You don't have the authorization status to navigate this website");
    };
};

module.exports = authorization;