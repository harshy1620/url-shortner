const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    shortId:{
        type:String,
        required:true,
        unique:true,
       },
    redirectURL:{
            type:String,
            required:true,
        }
},
{timestamps:true}
); 

const URL=mongoose.model("url",urlSchema);
module.exports=URL;