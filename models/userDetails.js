const mongoose = require('mongoose');
const {Schema,model} = mongoose;


 
const userSchema = new Schema({
   fullname : {
      type : String
   },
   email : {
      type : String
   },
   address : {
      type : String
   },
   password :{
      type : String
   }
});

const userDetail = model("userdetail",userSchema);

module.exports = userDetail;