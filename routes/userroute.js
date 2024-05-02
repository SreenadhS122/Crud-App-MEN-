const express = require('express');
const router = express.Router();
const {registerauth,registeruser} = require('../controllers/userservice');

//register
router.get('/register',registerauth);
router.post('/register',registeruser);

module.exports = router;