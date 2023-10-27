const User = require('../models/User');
module.exports = async (req, res, next) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (user) {
            req.flash('message', 'you are already logged in, no need to log in again.')
            res.redirect('/display-message');

        } else {
            // res.redirect("/auth/login");
            next();
        }
    } else {
        // res.redirect("/auth/login");
        next();
    }
};