<<<<<<< HEAD
const blogModel = require("../models/blogsModel")
// const authorModel = require("../models/authorModel")




=======
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")

//CREATE
const createblog = async function(req, res){
  let data = req.body
  let created = await blogModel.create(data)
  res.send({status: true, data: created})
}

//GET
>>>>>>> fc290eede4b8ce3084d3566e3b4781f2dbadfe39
const getblog = async (req,res)=>{
    let finder = await blogModel.find({deleted : false},{published :true}).populate("Author")
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
    let input2 = req.params.category
    let finder = await blogModel.find({authorid :input},{category :input2}).populate("author")
    return res.send({content : finder})

}
module.exports.createBlog=createBlog
module.exports.filter=filter
module.exports.getblog=getblog
module.exports.createblog = createblog