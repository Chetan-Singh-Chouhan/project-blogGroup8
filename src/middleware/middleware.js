// const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")

const isValidAuthor = async function(req,res,next){
try{
    let authorId = req.body.authorId
let finder =await authorModel.findById(authorId)
// console.log(finder)
if(!finder)return res.status(404).send({error : "Author doenst exist"})
}
catch{
    res.send({error : "Author doenst exist"})
}  
next()
}

const validToken = async function(req, res, next){
    let token = req.headers["x-api-key"];
    if (!token) return res.send({ status: false, msg: "Token must be present" });
  
    let decodedToken = jwt.verify(token, "group-8-project-secret-key");
    if (!decodedToken)
      return res.send({ status: false, msg: "Token is Invalid" });
      next()
}


const loginUser = async function (req, res, next) {
    let userName = req.body.emailId
    let password = req.body.password
    let user = await authorModel.findOne({ emailId: userName, password: password })
    if (!user) {
      return res.send({ status: false, msg: "Invalid User Name or Password" })
    }
    next()
  }
module.exports.isValidAuthor = isValidAuthor  
module.exports.validToken = validToken
module.exports.loginUser = loginUser