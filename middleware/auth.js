module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.session && req.session.user) {
            return next();
        }
        req.flash('error_msg', 'Please log in to access this resource');
        res.redirect('/login');
    },
    
    ensureAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.isAdmin) {
            return next();
        }
        req.flash('error_msg', 'Access denied. Admin only.');
        res.redirect('/');
    },

    ensureGuest: (req, res, next) => {
        if (!req.session.user) {
            return next();
        }
        res.redirect('/');
    }
}; 