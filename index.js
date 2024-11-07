const express=require('express');
const mongoose=require('mongoose');
const TodoRoutes=require("./Routes/TodoRoutes");

const app=express();
app.use(express.json());

//connecting db
mongoose.connect("mongodb://localhost:27017/todo").then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log("Error occured",err);
});

//routes
app.use("/todo",TodoRoutes);

//port creating
app.listen(300,()=>{
    console.log("server connected on port 300");
})