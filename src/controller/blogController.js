
const blogModel = require("../models/blogModel")
// const authorModel = require("../models/authorModel")





// const blogModel = require("../models/blogModel")
// const authorModel = require("../models/authorModel")

//CREATE
const createblog = async function(req, res){
  try{
  let data = req.body
  let created = await blogModel.create(data)
  res.send({status: true, data: created})
  }
  catch(err){
    res.send(err.message)
  }
}

//GET

const getblog = async (req,res)=> {

    let data = req.query
    
    let finder = await blogModel.find({isDeleted : false , isPublished :true,...data})
    if(finder.length==0) return res.status(404).send({
        status: false,
        msg: "Blog doesnt exits in database"
      })
       return res.status(200).send({
        status: true,
        data: 
           finder
        
      })
} 



// module.exports.createblog=createblog

module.exports.getblog=getblog
module.exports.createblog = createblog