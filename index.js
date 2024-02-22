const express =require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const dotenv =require("dotenv");

const app=express ();
dotenv.config();

const port = process.env.PORT || 3002;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MANGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ojbry9u.mongodb.net/registrationFormDB`,{

useNewUrlParser:true,
useUnifiedTopology:true,
});

const registrationSchema=new mongoose.Schema({
    name: String,
    email: String,
    password:String
});

const Registration= mongoose.model("Registration",registrationSchema);
app

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.sendFile(__dirname +"/project/index.html");

})

app.post("/register", async(req,res) => 
{
  try{
    const{name,email,password}=req.body;
     
    const existingUser = await Registration.findOne({email : email});
    if(!existingUser)
    { 
    const registrationDat=new Registration({

        name,
        email,
        password
    });
     await registrationData.save();
     res.redirect("/success");
}
else{
    console.log("you are alreay exits");
    res.redirect("/success");
}  
} 
  catch(error){

    console.log(error);
    res.redirect("error");
  } 
})

app.get("/success",(req,res) =>
{
    res.sendFile(_dirname+"/project/index.html");

})








app.listen(port,()=>
{
    console.log(`server is runing on part ${port}`);

});
