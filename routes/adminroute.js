const express = require('express');
const router = express.Router();
const {admindashboard,getedituser,postedituser,deleteuser,postsearchuser,getsearchuser,postadduser,getadduser} = require('../controllers/adminservice');

//add
router.post('/adduser',postadduser);
router.get('/adduser',getadduser);
//dashboard
router.get('/dashboard',admindashboard);
//edit
router.get('/edituser/:id',getedituser);
router.post('/edituser/:id',postedituser);
//search
router.post('/searchuser',postsearchuser);
router.get('/searchuser',getsearchuser);
//delete
router.get('/deleteuser/:id',deleteuser);

module.exports = router;