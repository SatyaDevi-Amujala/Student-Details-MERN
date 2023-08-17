const express = require('express')
const cors = require('cors')
const mongoose=require('mongoose')
const dataSchema=require('./model')
const app=express()

mongoose.connect('mongodb+srv://satya:satya401@cluster0.kike3w4.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DB Connected")
)

app.use(express.json())
app.use(cors({
    origin:'*'
}))

app.post("/adddata",async(req,res)=>{
    try{
    const {fname,lname,idnum,email,pswd,cpswd,gender,year,branch,stphn,ptphn}=req.body;
    console.log("data::::::",fname,lname,idnum,email,pswd,cpswd,gender,year,branch,stphn,ptphn)
    let exist=await dataSchema.findOne({idnum:idnum})
    if(exist){
        res.send("Id Number Already Exists")
    }
    let exists=await dataSchema.findOne({email:email})
    if(exists){
        res.send("Email Already Exists")
    }
    let newData=new dataSchema({
        fname,lname,idnum,email,pswd,cpswd,gender,year,branch,stphn,ptphn
    }
        )
    await newData.save()
    return res.status(200).send("Registered")
   }
    catch(err){
        console.log(err)
    }
})

app.post('/login', async(req,res)=>{
    try{
        const{email,password}=req.body;
        let exist=await dataSchema.findOne({email});
        if(!exist){
            return res.send("User  Not Found");
        }
        if(exist.pswd!=password){
            return res.send("Invalid credentials");
        }
        return res.send("Login")
    }
    catch(err){
        console.log(err)
       return  res.send("Server error")
    }
})

app.get('/getdata', async(req,res)=>{
    try{
        const mydata=await dataSchema.find();
        return res.send(mydata)
    }
    catch(err){
        res.send(err)
    }
})
app.get('/getitem/:id', async(req,res)=>{
    try{
        const onedata=await dataSchema.find({idnum:req.params.id});
        return res.send(onedata[0])
    }
    catch(err){
        res.send(err)
    }
})
app.delete('/delete/:id', async(req,res) =>{
    try{
        await dataSchema.findByIdAndDelete(req.params.id)
        const mydata=await dataSchema.find();
        return res.send(mydata)
    }
    catch(err){
        console.log(err)
    }
})
app.put('/editdata/:id', async(req,res) =>{
    try{
        const{email,idnum}=req.body;
        console.log(email,idnum)
        console.log("editedData^^^^=",req.body)
        let exist=await dataSchema.findOne({idnum:idnum})
        console.log("existingdata",exist)
    if( exist!=null && exist._id!=req.params.id){
        res.send("Id Number Already Exists")
    }
    let exists=await dataSchema.findOne({email:email})
    if(exists!=null && exists._id!=req.params.id){
        res.send("Email Already Exists")}
        await dataSchema.findByIdAndUpdate({_id:req.params.id},
            {fname:req.body.fname,
            lname:req.body.lname,
            idnum:req.body.idnum,
            email:req.body.email,
            pswd:req.body.pswd,
            cpswd:req.body.cpswd,
            gender:req.body.gender,
            year:req.body.year,
            branch:req.body.branch,
            stphn:req.body.stphn,
            ptphn:req.body.ptphn
        
        })
        return res.send("Updated")
    }
    catch(err){
        console.log(err)
    }
})
app.get('/sortdata', async(req,res)=>{
    try{
        const onedata=await dataSchema.find().sort({idnum:1});
        return res.send(onedata)
    }
    catch(err){
        res.send(err)
    }
})
app.listen(5000, ()=>console.log("Server Connected"))