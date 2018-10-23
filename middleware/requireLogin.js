module.exports = function(req, res, next){
    if(!req.session.userId){
        req.session.message = "Please log in first";
        res.redirect('/auth/login');
    } else {
        next();
    }
}

// require everywhere user must be logged in, i.e. everywhere except homepage