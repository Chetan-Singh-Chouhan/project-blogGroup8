const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const emailValidator = require("email-validator")
const passwordValidator = require("password-validator")

const createAuthor = async function(req, res){
    let data = req.body
    const{fname, lname, title, email, password} = req.body
    if(!fname) return res.status(400).send({status: false, msg:"fname is required"})
    if(!lname) return res.status(400).send({status: false, msg:"lname is required"})
    if(!title) return res.status(400).send({status: false, msg:"title is required"})
    if(!email) return res.status(400).send({status: false, msg:"email is required"})
    if(!password) return res.status(400).send({status: false, msg:"password is required"})
    const validName = (/^[a-zA-Z_]{3,20}$/)
    let schema = new passwordValidator();
          schema
                .is().min(8)  //Must be of minimum length 8
                .is().max(100)  //Maximum length should not be more than 100
                .has().uppercase()  //Must contain one uppercase
                .has().lowercase()  //Must contain one lowercase
                .has().digits(2)  //Must have atleast 2 digits

    if(!validName.test(fname)) return res.status(400).send({status: false, msg: "Numbers Not Allowed & Must be of minimum 3 characters"})
    if(!validName.test(lname)) return res.status(400).send({status: false, msg: "Numbers Not Allowed & Must be of minimum 3 characters"})
    if(!(["Mr", "Mrs", "Miss"].includes(title))) return res.status(400).send({status: false, msg: "Can only use Mr, Mrs and Miss"})
    if(!emailValidator.validate(email)) return res.status(400).send({status:false, msg:"Invalid Email"})
    if(!schema.validate(password)) return res.status(400).send({status: false, msg: "Password requirements didn't match"})

    let created = await authorModel.create(data)
    res.status(201).send({status: true, data: created})
}
const loginAuthor = async function(req,res){
  let isAuthorExist = await authorModel.findOne({email:req.body.email,password:req.body.password})
  if(isAuthorExist){
      let token = jwt.sign({authorId:isAuthorExist._id},'myProject1SecretKey')
      res.send({status:true,data:token})

      res.setHeader("x-api-key", token);
      res.status(200).send({token:token,message:"login success" });
  }
  else res.status(401).send("Your Email ID And Password are not valid")
}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor



