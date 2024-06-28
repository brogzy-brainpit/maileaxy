const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");

require("dotenv").config()
const addTemplate= async(req,res)=>{
    try {
       // let auth= req.headers.authorization
       let {name,id}= req.params
       let {email}= req.body
       console.log(id,email);
       const user= await User.findByIdAndUpdate(
          id,
          { 
             //  "$set": { "location": "lagos" },
              "$push": { "templates": req.body }
          }, 
          { "new": true, "upsert": true },
       
       )

   
       res.status(200).json({user})
      } catch (error) {
       
       res.status(403).send(error)
      }
    }
    const updateTemplate= async(req,res)=>{
        try {
           // let auth= req.headers.authorization
           let {id}= req.params
           let {email,name}= req.body
           console.log(id,email);

           
           const user= await User.findOneAndUpdate(
              {_id:id,"contacts.name":name},
              { 
                 //  "$set": { "location": "lagos" },
                  "$set": { 'contacts.$.email': email }
              }, 
              { "new": true, "upsert": true ,},
           
           )
         //   console.log(user);
       
           res.status(200).json({user})
          } catch (error) {
           console.log(error);
           res.status(403).send(error)
          }
        }
   const deleteTemplate= async(req,res)=>{
      try {
         // let auth= req.headers.authorization
         let {name,id}= req.params
         let {email}= req.body
         console.log(id,email);
         const user= await User.findByIdAndUpdate(
            id,
            { 
               //  "$set": { "location": "lagos" },
                "$pull": { "templates":  {
                  "email": email,
               
              } }
            }, 
            { "new": true, "upsert": true },
         
         )
         console.log(user);
      
         res.status(200).json({user})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }
      }

   const test= async(req,res)=>{
      try {
         let auth= req.headers.authorization
         const token= auth.split("Bearer ")[1]
         let decodedUser= jwt.verify(token,process.env.JWT_SECRET)
     console.log(decodedUser);
         const user= await User.findByIdAndUpdate(
            decodedUser.id,
            { 
               //  "$set": { "location": "lagos" },
                "$pull": { "contacts":  {
                  "name": "yusuf",
                 
              } } 
            }, 
            { "new": true, "upsert": true },
          
         )
         console.log(user);
     
         res.status(200).json({user})
        } catch (error) {
         console.log(error);
         res.status(403).send(error)
        }
      }

module.exports= {addTemplate,deleteTemplate,updateTemplate}