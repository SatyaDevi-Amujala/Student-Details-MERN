const mongoose=require('mongoose')

const dataSchema= new mongoose.Schema({
    fname:
    {type:String,
     required:true},
    lname:
    {type:String,
    required:true},
    idnum:
    {type:String,
    unique:true,
    required:true},
    email:
    {type:String,
    unique:true,
    required:true},
    pswd:
    {type:String},
    cpswd:
    {type:String},
    gender:
    {type:String},
    year:
    {type:String},
    branch:
    {type:String},
    stphn:
    {type:Number},
    ptphn:
    {type:Number},
})

module.exports=mongoose.model("dataSchema",dataSchema)
