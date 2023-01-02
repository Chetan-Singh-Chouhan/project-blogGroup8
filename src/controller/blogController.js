const blogModel = require("../models/blogsModel")
// const authorModel = require("../models/authorModel")
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
    let finder = await blogModel.find({authorid :input}).populate("author")

}

Router.get("/getblogs",controll.getblog)
Router.get("/getblogs/:input",controll.filter)
module.exports.getblog=getblog