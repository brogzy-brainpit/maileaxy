const mongoose= require("mongoose");
const apiKeys= require("../API");
const authSchema= new mongoose.Schema({
    userName:String,
    emailSent:{
        type:Number,
        default:0
    },
   email:{
    type:String,
    unique:true,
    required:[true,"please provide an email"]
   },
   password:{
    type:String,
    required:[true,"please provide a password"]
},
createdAt:{
    type:Date,
    default:Date.now()
},
contacts:{
    type:Array,
    default:[]
   
},
templates:{
    type:Array,
    default:[]
   
},
apiKeys:{
    type:String,
    default:apiKeys()
   
}
})

module.exports =mongoose.model("Users",authSchema)