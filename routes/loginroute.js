const express = require('express');
const router = express.Router();
const {homepageauth,loginauthentication,renderloginauth} = require('../controllers/loginservice');

//home
router.get('/',homepageauth);
//login
router.post('/login',loginauthentication);
router.get('/login',renderloginauth);

module.exports = router;