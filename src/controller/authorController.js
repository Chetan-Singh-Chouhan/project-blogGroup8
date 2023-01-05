const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const emailValidator = require("email-validator")

const createAuthor = async function(req, res){
    let data = req.body
    const{fname, lname, title, email, password} = req.body
    if(!fname) return res.status(400).send({status: false, msg:"fname is required"})
    if(!lname) return res.status(400).send({status: false, msg:"lname is required"})
    if(!title) return res.status(400).send({status: false, msg:"title is required"})
    if(!email) return res.status(400).send({status: false, msg:"email is required"})
    if(!password) return res.status(400).send({status: false, msg:"password is required"})

    const validName = (/^[a-zA-Z_]{3,20}$/)
    // const validPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)

    if(!validName.test(fname)) return res.status(400).send({status: false, msg: "Invalid firstname"})
    if(!validName.test(lname)) return res.status(400).send({status: false, msg: "Invalid lastname"})
    if(!(["Mr", "Mrs", "Miss"].includes(title))) return res.status(400).send({status: false, msg: "Can only use Mr, Mrs and Miss"})
    if(!emailValidator.validate(email)) return res.status(400).send({status:false, msg:"Invalid Email"})
    // if(!validPassword.test(password)) return res.status(400).send({status: false, msg: "Invalid password"})

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