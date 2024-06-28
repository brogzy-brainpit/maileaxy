const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const User= require("../model/userAuth");
require("dotenv").config();


const createUser= async(req,res)=>{
  try {
   const {email,password}= req.body
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   let newUser={...req.body,password:hashedPassword} 
  const user= await User.create(newUser)
  if(!user){
   res.status(400).json(`can't creat user, please try again later`)
  
  }
   const token= jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
   res.status(200).json(token)
  } catch (error) {
   if(error){
    console.log(error)
   return res.status(400).json({msg:error})

   }
   res.status(500).json({error})

  }
}


const login= async(req,res)=>{
    const {email,password}= req.body;
  console.log(email);
  try {
   const user= await User.findOne({email})
   if(!user){
    return res.status(404).send("email not found, please provide a valid email");

   }
    const confirmPassword= await bcrypt.compare(password,user.password) 
    if(!confirmPassword){
    return res.status(404).send("invalid credentials, please provide a valid credential");
    }
    const token= jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
   res.status(200).send(token);
  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
module.exports= {createUser,login}