module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
            req.flash('error_msg', 'Not Autohorized');
            res.redirect('/users/login');
    }
};