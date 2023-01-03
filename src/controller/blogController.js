
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

const isdeletebyId=async function(req,res){
  let blogbyId=req.param.blogbyId
   if(!blogbyId){
    return res.send({status:false,msg:"blogId is invalid"})
   }

    let findBlogId=await blogModel.findOne({_id: blogbyId, isdeleted:false})
    if(!findBlogId){
      return res.send({status:false,msg:"findBlogId is invalid"})
    }


    let date =new Data()

    let isdeleted=await blogModel.findOneAndUpdate({_id:blogbyId,isdeleted:false},{$set:{isdeleted:true,deletedAt:date}},{new:true})

    res.send({satus:true,msg:isdeleted})


   
}


// module.exports.createblog=createblog

module.exports.getblog=getblog
module.exports.createblog = createblog 
module.exports.isdeletebyId=isdeletebyId