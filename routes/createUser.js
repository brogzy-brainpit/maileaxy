const express= require("express");
const route=express.Router();
const {createUser,login} =require("../controllers/users")
const {dashboard,test} =require("../controllers/dashboard")
const {deleteSubscriber,addSubscriber,updateSubscriber} =require("../controllers/subscribers")

// register a new user
route.post("/register",createUser);
route.get("/dashboard",dashboard);
// /api/v1/auth/${id}/subscribers/pop


//login a  user
route.post("/login",login)
module.exports= route
