const blogModel = require("../models/blogModel")

const isValidAuthor = async function(req,res,next){
    let data = req.body.authorId
    if(!data){
        return res.status(400).send({status: false, msg: "Invalid authorId"})
    }
    else{
        try{
            let data1 = req.body
            let savedData = blogModel.findById({authorId: data1._id})
            if(savedData){
                res.status(201).send({data1})
            }
        }
        catch(err){
            res.send("Error msg:", err.message)
        }
    }
    next()
}

module.exports.isValidAuthor = isValidAuthor