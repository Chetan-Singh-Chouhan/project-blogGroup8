const mongoose =require('mongoose')
const ObjectID= mongoose.Schema.Types.ObjectID
const blogsSchema = new mongoose.Schema({
    

    title:{
        type:String,
        required: true

    },
    body:{
        type:String,
        required: true
    },
    authorId:{
        type: ObjectID,
        ref: "author",
        required: true
    },
    tags:{
        type:[String],
        required: true
    },
    category:{
        type:String,
        required: true
    },
    subcategory:{
        type : [String],
       
    },
    deletedAt:
    {
        type:Date
    },
    publishedAt:{
        type:Date,
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isPublished:{
        type:Boolean,
        default: false
    }
    
},{timestamps:true})
module.exports = mongoose.model("blog",blogsSchema) 