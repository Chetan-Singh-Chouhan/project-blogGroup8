const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")

const authentication = async function(req,res,next){
    try{
        let token = req.headers['x-api-key']
        if(!token) 
        { res.send("Invalid Token") }
        jwt.verify(token,'myProject1SecretKey')
        next()
    }
    catch(err){
        res.status(401).send("UnAuthenticated, Please Login First")
   
    }
}
const authorization = async function(req,res,next){
  try{
    let token = req.headers['x-api-key']
    let blogId= req.params.blogId
    if(!isValidObjectId(blogId)) 
        res.status(400).send("Please Enter Valid Object Id")
    let blogdata = await blogModel.findById(blogId)
    if(!blogdata) 
        res.status(404).send("Blog Data not Found")
    let decodedToken = jwt.verify(token,'myProject1SecretKey')
    if(decodedToken.authorId!=blogdata.authorId){
        res.status(403).send("Unauthorised")
    }
    next()   
    
  }
  catch(err){
    console.log(err)
  }
}
module.exports.authentication=authentication
module.exports.authorization=authorization