const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const emailValidator = require("email-validator")
let passwordValidator = require("password-validator")

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
    res.send({status: true, data: created})
}
const loginUser = async function(req, res){
    let data = authorModel.findById({emailId: req.body.emailId})
    let token = jwt.sign(
    {
      userId: data._id
    },
    "projectsecretcode"
  )
  res.send({ status: true, data: token });
}

module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser