const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")

const createAuthor = async function(req, res){
    let data = req.body
    const{fname, lname, title, email, password} = req.body
    if(!fname) return res.status(400).send({status: false, msg:"fname is required"})
    if(!lname) return res.status(400).send({status: false, msg:"lname is required"})
    if(!title) return res.status(400).send({status: false, msg:"title is required"})
    if(!email) return res.status(400).send({status: false, msg:"email is required"})
    if(!password) return res.status(400).send({status: false, msg:"password is required"})
    

    let created = await authorModel.create(data)
    res.send({status: true, data: created})
}
const loginUser = async function(req, res){
    let data = authorModel.findById({emailId: req.body.emailId})
    let token = jwt.sign(
    {
      userId: data._id
    },
    "group-8-project-secret-key"
  )
  res.send({ status: true, data: token });
}

module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser

