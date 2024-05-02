const logoutsessiondestroy = (req,res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = {logoutsessiondestroy};