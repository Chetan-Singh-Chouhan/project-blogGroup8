
const blogModel = require("../models/blogModel")
let moment = require('moment')
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

const isdeletebyId=async function(req,res){

  try{
  let blogId=req.params.blogId
   //console.log(blogbyId)
   if(!blogId){
    return res.status(400).send({status:false,msg:"blogId is invalid"})
   }

    let findBlogId=await blogModel.findById({_id: blogId, isDeleted:false})
    if(!findBlogId){
      return res.status(404).send({status:false,msg:"findBlogId is invalid"})
    }


    let date =new Date()

    let isdeleted=await blogModel.findOneAndUpdate({_id:blogId,isDeleted:false},{$set:{isDeleted:true,deletedAt:date}},{new:true})

    res.status(201).send({satus:true,msg:isdeleted})
  }
  catch(error){
    return res.status(500).send("Error msg:", error.message)
  }


   
}



const deletebyquery=async function(req,res){
  try{
    const dataquery=req.query
  
    //let {category, authorid, tag, subcategory, unpublished}=dataquery
    const datatodelete=await blogModel.findOne(dataquery)
    if(!datatodelete){
      return res.status(404).send({status:false,msg:"nomatching"})
    }
    if(datatodelete.isDeleted===true){
      return res.status(403).send({status:false,msg:"alreadydelete"})
    }
    let blogId=datatodelete._id
  
    let deleteblog=await blogModel.findOneAndUpdate(dataquery,{$set:{isDeleted:true,deletedAt:new Date()}},{new:true,upsert:true})
  
    return res.status(201).send({status:true,msg:deleteblog})
  }
  catch(error){
    res.status(500).send("error",error.message)
  }
  

}


module.exports.getblog=getblog
module.exports.createblog = createblog 
module.exports.isdeletebyId=isdeletebyId
module.exports.updateBlogData = updateBlogData
module.exports.deletebyquery=deletebyquery