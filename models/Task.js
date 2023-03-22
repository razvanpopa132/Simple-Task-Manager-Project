const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema(
    {name:{
        type:String,
        required:[true,'must provide name'],
        maxlength:[20,'name exceeding 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }}
)

module.exports=mongoose.model('Task',TaskSchema)