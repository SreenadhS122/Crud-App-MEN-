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

const admindashboard = async (req,res) => {
    if(req.session.admin){
        const viewusers = await userDetail.find();
        return res.render('dashboard',{viewusers:viewusers});
    }
    else if(req.session.user){
        return res.redirect('/login')
    }
    else{
        return res.render('login',{message:null,username:null});
    }
};
const getedituser = async (req,res) => {
    const id = req.params.id;
    if(req.session.admin){
    const edituser = await userDetail.findOne({_id:id});
    res.render('edituser',{edituser:edituser,message:null});
    }
    else if(req.session.user){
        res.redirect('/login');
    }
    else{
        res.redirect('/');
    }
};

const postedituser = async (req,res) => {
    const id = req.params.id;
    const edituser = await userDetail.findOne({_id:id});
    const {fullname,email,address} = req.body;
    if(fullname.trim() == "" || email.trim() == "" || address.trim() == ""){
        res.render('edituser',{message:message.fielderr,edituser:edituser})
    }else{
     if(await userDetail.findOne({email : email}) && edituser.email != email){
        res.render('edituser',{edituser:edituser,message:message.userexist});
    }else{
     await userDetail.findByIdAndUpdate(id,{fullname : fullname,email : email,address : address});
     res.redirect('/dashboard');
     }
    }
};

const deleteuser = async (req,res) => {
    const id = req.params.id;
    console.log(id);
    if(req.session.user){
        return res.redirect('/login');
    }
    else if(req.session.admin){
        await userDetail.findByIdAndDelete(id);
        return res.redirect('/dashboard');
    }
    else{
        return res.render('login',{message : null,username:null});
    }
}; 

const postsearchuser = async (req,res) => {
    const searchkey = req.body.searchkey;
    const searchuser = await userDetail.find({fullname: {$regex : "^"+searchkey ,$options : "i"}});
    res.render('dashboard',{viewusers:searchuser});
};

const getsearchuser = (req,res) => {
    res.redirect('/dashboard');
}

const postadduser = async (req,res) => {
    const {fullname,email,address,password} = req.body;
    const viewusers = await userDetail.find();
    const newuser = new userDetail({
        fullname : req.body.fullname,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        address : req.body.address
    });
    if(fullname.trim() == "" || email.trim() == "" || password.trim() == "" || address.trim() == ""){
        res.render('adduser',{message:message.fielderr,fullname:fullname,email:email,address:address,password:password})
    }else{
     if(await userDetail.findOne({email : newuser.email})){
        res.render('adduser',{message:message.userexist,fullname:fullname,email:null,address:address,password:password});
    }else{
        await newuser.save();
        res.redirect('/dashboard');
     }
    }
};

const getadduser = (req,res) => {
    if(req.session.user){
        return res.redirect('/login');
    }
    else if(req.session.admin){
        return res.render('adduser',{message:null,fullname:null,email:null,address:null,password:null});
    }
    else{
        return res.redirect('/login');
    }
};


module.exports = {admindashboard,getedituser,postedituser,deleteuser,postsearchuser,getsearchuser,postadduser,getadduser};