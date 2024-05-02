const admins = require('../models/admins');
const userDetail = require('../models/userDetails');
const bcrypt = require('bcrypt');

const message = {succmsg:'you have successfully logged in.',
                invalidentry : 'Invalid entry',
                logmsg:'Enter details',
                filluser:"User must not be empty.",
                fillpass:'Password must not be empty.',
                fielderr:'Fiels should not be empty.',
                passerr:'Incorrect password',
                userloginmsg : 'You have signed in and login to continue.',
                userexist : 'User with the same email exists'};

const homepageauth = (req,res)=>{
    if(req.session.user){
        return res.redirect('/login');
    }
    else if(req.session.admin){
        return res.redirect('/dashboard');
    }
    else{
        return res.render('login',{message : null,username:null});
    }
};
const loginauthentication = async (req,res) => {
    const {username,password} = req.body;
    const testadmin = await admins.findOne();
    const testuser = await userDetail.findOne({email : username});
    if(username.trim() == "" || password.trim() == ""){
        res.render('login',{message:message.fielderr,color:"danger",username:username,password:password})
    }else{
    if(testuser){
     if(testuser.email == username && !bcrypt.compareSync(password,testuser.password)){
        res.render('login',{message:message.passerr,color:"danger",username:username});
     }
     else if(testuser.email == username && bcrypt.compareSync(password,testuser.password)){
            req.session.user = true;
            req.session.username = username;
            req.session.userinfo = testuser;
            return res.render('userpage',{message:message.succmsg,user:username,userinfo:testuser});
        }
    }
    if(testadmin.username == username && !bcrypt.compareSync(password,testadmin.password)){
        res.render('login',{message:message.passerr,color:"danger",username:username});
    }
    
    else if(testadmin.username == username && bcrypt.compareSync(password,testadmin.password)){
        req.session.admin = true;
        res.redirect('/dashboard');
    }
    else{
        res.render('login',{message:message.invalidentry,color:"danger",username:null});
    }
    }
};
const renderloginauth = (req,res) => {
    if(req.session.user){
        return res.render('userpage',{message:message.succmsg,user:req.session.username,userinfo:req.session.userinfo});
    }
    else if(req.session.admin){
        return res.redirect('/dashboard');
    }
    else{
        return res.render('login',{message:null,username:null});
    }  
};


module.exports = {homepageauth,loginauthentication,renderloginauth};