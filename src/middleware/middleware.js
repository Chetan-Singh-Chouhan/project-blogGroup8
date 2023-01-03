// const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")

const isValidAuthor = async function(req,res,next){
try{let authorId = req.body.authorId
let finder =await authorModel.findById(authorId)
// console.log(finder)
if(!finder)return res.status(404).send({error : "Author doenst exist"})
}
catch{
    res.send({error : "Author doenst exist"})
}  
next()
}
module.exports.isValidAuthor = isValidAuthor  