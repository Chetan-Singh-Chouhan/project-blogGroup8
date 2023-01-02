const authorModel = require("../models/authorModel")

const createAuthor = async (req,res)=>{
    let input = req.body
    let creation = await authorModel.create(input)
    return res.send({authorCreated : creation})
}
module.exports.createAuthor=createAuthor