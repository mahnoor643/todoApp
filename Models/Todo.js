const mongoose=require("mongoose");

const TodoSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        isComplete:{
            type:Boolean,
            default:false
        }
    },
    {timestamps:true}
)

const Todo=mongoose.model("todo",TodoSchema);
module.exports=Todo;