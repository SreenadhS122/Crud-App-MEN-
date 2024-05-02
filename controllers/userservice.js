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


const registerauth = (req,res)=>{
    if(req.session.user){
        return res.redirect('/login');
        }
    else if(req.session.admin){
        return res.redirect('/dashboard');
    }
    else{
        return res.render('register',{message:null,fullname:null,email:null,address:null,password:null});
    }   
};

const registeruser = async (req,res) => {
    const {fullname,email,address,password} = req.body;
    const newuser = new userDetail({
        fullname : req.body.fullname,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        address : req.body.address
    });
    if(fullname.trim() == "" || email.trim() == "" || address.trim() == "" || password.trim() == ""){
        res.render('register',{message:message.fielderr,fullname:fullname,email:email,address:address,password:password})
    }else{
     if(await userDetail.findOne({email : newuser.email})){
        res.render('register',{message:message.userexist,fullname:fullname,email:null,address:address,password:password});
     }else{
        await newuser.save();
        res.render('login',{message:message.userloginmsg,color:"success",username : null});
     }
    }
}

module.exports = {registerauth,registeruser};