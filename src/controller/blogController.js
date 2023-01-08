const blogModel = require("../models/blogModel")
let moment = require('moment')
const { isValidObjectId, default: mongoose } = require("mongoose")
const authorModel = require("../models/authorModel")


//=========================CREATE the blogs
const createblog = async function(req, res){
  try{
    let data = req.body
    const{title,body,authorId,tags,category,subcategory} = req.body
    if(!title) return res.status(400).send({status: false, msg:"title is required"})
    if(!body) return res.status(400).send({status: false, msg:"body is required"})
    if(!authorId) return res.status(400).send({status: false, msg:"authorId is required"})
    if(!tags) return res.status(400).send({status: false, msg:"tags is required"})
    if(!category) return res.status(400).send({status: false, msg:"category is required"})
    if(!subcategory) return res.status(400).send({status: false, msg:"subcategory is required"})
    if(!isValidObjectId(authorId)) res.status(400).send({status:false,msg:"Author id is not Valid"})
    const isAuthorIdValid = await authorModel.findById(authorId).count()
    if(isAuthorIdValid==0){
      res.status(404).send({status:false,msg:"Author id doesnt Exist"})
    }
    let created = await blogModel.create(data)
    res.send({status: true, data: created})
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

//============================ GET the blogs

const getblog = async function(req,res){
 try{
  if(req.query.authorId){
    if(!mongoose.isValidObjectId(req.query.authorId))
    return res.send({status: false, msg: "Please enter valid author Id"})
  }
  let blogFound = await blogModel.find(req.query)

  let len = blogFound.length
  let arr = []
  for(let i=0; i<len; i++){
    if(blogFound[i].isDeleted == false && blogFound[i].isPublished == true)
    arr.push(blogFound[i])
  }
  if(arr.length > 0){
    res.status(200).send({status: true, data: arr, count: arr.length})
  }
  else{
    res.status(400).send({status: false, msg: "Data Not Found"})
  }
 }
 catch(err){
  res.status(500).send({status: false, error: err.message})
 }
} 

//updating blog data
const updateBlogData = async function(req,res){
  try
  {    
       let data = req.body
       let blogId = req.params.blogId

       if(Object.keys(data).length == 0){
        return res.status(404).send({status:false, msg: "No data for update"})
       }
       if(!mongoose.isValidObjectId(blogId)){
        return res.status(400).send({status: false, msg: "Please Enter Valid BlogID"})
       }
       
       let findBlog =  await blogModel.findById(blogId)
       if(!findBlog){
        return res.status(404).send({status: false, msg: "BlogId is Invalid"})
       }
       if(findBlog.authorId._id.toString() !== req.body.authorId){
       return res.status(401).send({staus: false, msg: "Authorisation failed"})
       }
       if(findBlog.isDeleted == true){
        return res.status(404).send({status: false, msg: "Blog is already deleted"})
       }
       if(findBlog.isDeleted == false){
        let updateBlog = await blogModel.findOneAndUpdate({_id: blogId},{
          $set: {
            title: data.title,
            body: data.body,
            category: data.category,
            publishedAt: Date.now(),
            isPublished: true
          },
          $push: {
            tags: data.tags,
            subcategory: data.subcategory
          }
        }, {new: true, upsert: true})
        return res.status(200).send({status:true, msg: updateBlog})
       }
    }
 catch(err)
 {
   res.status(500).send({status:false,msg:err.message})
 }
}
// delete blog

const deleteByParams = async function (req, res) {
  try {
        let userId = req.params.blogId;
        if(!isValidObjectId(userId))
          return res.status(400).send({status:false,msg:" Please Enter Correct valid objectId"})
        let checkBlog = await blogModel.findById(userId)
        if(!checkBlog)
          return res.status(400).send({status:false,msg:"userId not found"})
        if (checkBlog.isDeleted == true)
          return res.status(404).send({ status:false,msg: "blog is already deleted...!" })
        let deleteBlog = await blogModel.findOneAndUpdate(
            { _id: userId },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        );
          return res.status(200).send({ status: true, data: deleteBlog })


      }
      catch(err)
      {
          return res.status(500).send({ status: false, msg: err.message })
      }

}



const deleteByQuery = async function (req, res) {
  try {
      let filterdata={isDeleted:false,authorId: req.authorId}
      let {category,subcategory,tags,authorId} = req.query

      if(authorId){
        if(!mongoose.isValidObjectId(req.query.authorId))
        return res.status(400).send({status:false,message:"Please Enter Correct valid authorId"})
        else
        filterdata.authorId=authorId
      }

      if(category){
        filterdata.category=category
      }

      if(subcategory){
        filterdata.subcategory=subcategory
      }

      if(tags){
        filterdata.tags=tags
      }
      let checkBlog = await blogModel.findOne(filterdata.authorId)

      if(!checkBlog)
        return res.status(404).send({status:false,msg:"No record found"})
      
      if(checkBlog.authorId._id.toString()!==req.authorId)
         return res.status(401).send({status:false,msg:"Authorisation failed"})

      let updatedBlog = await blogModel.updateOne(
              filterdata,
              { $set: { isDeleted: true, deletedAt: new Date() } },
              { new: true}
          );

         return res.status(200).send({ status: true, data: updatedBlog })


  } catch (err) {
     return res.status(500).send({ status: false, msg: err.message })
  }

}


module.exports.getblog=getblog
module.exports.createblog=createblog 
module.exports.deleteByParams=deleteByParams
module.exports.updateBlogData=updateBlogData
module.exports.deleteByQuery=deleteByQuery