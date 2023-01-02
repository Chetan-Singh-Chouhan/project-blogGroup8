const authorModel = require("../models/authorModel")

const createAuthor = async function(req, res){
    let data = req.body
    let created = await authorModel.create(data)
    res.send({status: true, data: created})
}

module.exports.createAuthor = createAuthor

