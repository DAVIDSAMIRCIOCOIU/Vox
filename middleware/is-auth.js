module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log("not logged")
        return res.redirect('/login');
        
    }

    console.log("logged in")
    next();
}