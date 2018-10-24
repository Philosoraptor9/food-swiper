
const requireLogin = (req, res, next) => {
    if(!req.session.userId){
        req.session.message = "Please log in first";
        res.redirect('/auth/login');
    } else {
        next();
    }
}

// const requireLoginRedirect = setTimeout(requireLogin, 10000);

module.exports = requireLogin;

// require everywhere user must be logged in, i.e. everywhere except homepage