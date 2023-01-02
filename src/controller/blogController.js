
const blogModel = require("../models/blogModel")
// const authorModel = require("../models/authorModel")





// const blogModel = require("../models/blogModel")
// const authorModel = require("../models/authorModel")

//CREATE
const createblog = async function(req, res){
  let data = req.body
  let created = await blogModel.create(data)
  res.send({status: true, data: created})
}

//GET

const getblog = async (req,res)=> {
    let finder = await blogModel.find({isDeleted : false},{isPublished :true}).populate("authorId")
    if(!finder) return res.status(404).send({
        status: false,
        msg: "Blog doesnt exits in database"
      })
      else return res.status(200).send({
        status: true,
        data: {
           finder
        }
      })
} 

const filter = async (req,res)=>{
    let input = req.params.author_id
    if(!input)return res.status(401).send({msg :"Bad request"})
    let input2 = req.params.category
    if(!input2) return res.status(404).send({msg :`${input2} didnt exist`})
    if(!input&&input2)return res.send(400).send({error:"Incomplte information"}) 
    let finder = await blogModel.find({authorId :input},{category :input2}).populate("authorId")
    return res.send({content : finder})



}
// module.exports.createblog=createblog
module.exports.filter=filter
module.exports.getblog=getblog
module.exports.createblog = createblog