
const blogModel = require("../models/blogModel")
let moment = require('moment')
const { isValidObjectId } = require("mongoose")
let date = new Date()

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

//updating blog data 
const updateBlogData = async function(req,res){
  try
  {    
       
      // checking if there is data in request's body or not
       if(Object.keys(req.body).length != 0) 
       {
           blogId = req.params.blogId //storing blog id into variable
           let blogIDExist = await blogModel.findById(blogId) //validation - if user id valid or not
           //checking if user is deleted or not
           if(blogIDExist.isDeleted==true) res.status(400).send({status:false,msg: "This Blog ID Doesn't Exist"})
           let updatedBlogData = await blogModel.findByIdAndUpdate
           (
             blogId,
             {$set:{
               ...req.body,
               isPublished: true,
               publishedAt : moment().format() //inserting date with moment library
               }},
             {new:true}
           )
           res.status(200).send(updatedBlogData)
       }
       else 
       {
              res.status(400).send({status:false,msg: "There is no Data in request's Body"})
       }
    }
 catch
 {
   res.status(404).send({status:false,msg:"Please Enter Correct Blog ID"})
 }
}

// delete blog

const deleteByParams = async function (req, res) {
  try {

      let userId = req.params.blogId;
      if(!isValidObjectId(userId))
        return res.status(400).send({status:false,msg:"This is not valid objectId"})
      
      let checkBlog = await blogModel.findById(userId)
       if(!userId)
        return res.status(400).send({status:false,msg:"userId not found"})
      
      if (checkBlog.isDeleted == true)
          return res.status(400).send({ status: false, msg: "blog is already deleted...!" })


          let deleteBlog = await blogModel.findOneAndUpdate(
              { _id: userId },
              { $set: { isDeleted: true, deletedAt: new Date() } },
              { new: true }
          );

         return res.status(200).send({ status: true, data: deleteBlog })


  } catch (err) {
     return res.status(500).send({ status: false, msg: err.message })
  }

}


const deleteByQuery = async function (req, res) {
  try {

      let data = req.query
      //console.log(data)
      let checkBlog = await blogModel.findOne(data)

      if(!checkBlog)
        return res.status(404).send({status:false,msg:"Data is nomatching"})

      if (checkBlog.isDeleted == true)
          return res.status(400).send({ status: false, msg: "blog is already deleted" })

          let deleteBlog = await blogModel.findOneAndUpdate(
               data,
              { $set: { isDeleted: true, deletedAt: new Date() } },
              { new: true,upsert:true}
          );

         return res.status(200).send({ status: true, data: deleteBlog })


  } catch (err) {
     return res.status(500).send({ status: false, msg: err.message })
  }

}


module.exports.getblog=getblog
module.exports.createblog = createblog 
module.exports.deleteByParams=deleteByParams
module.exports.updateBlogData = updateBlogData
module.exports.deleteByQuery=deleteByQuery