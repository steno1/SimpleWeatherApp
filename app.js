const axios=require("axios");
const https=require("https");
const express= require("express");
const bodyParser=require("body-parser");
require("dotenv").config();
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',
 (req, res)=>{
  res.setHeader("Content-Type", "text/html")
  res.sendFile(__dirname+ "/index.html")
 });

 app.post("/", async(req, res)=>{
  res.setHeader("Content-Type", "text/html")
   try {
    const query=req.body.cityName
    const unit="metric"
    const apiKey='6d07de673c16aa09bdcd24a4c11b4d91';
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
    await https.get(url, function(response){
      response.on("data", function(data){
    
        const answer=JSON.parse(data);
        const desc=answer.weather[0].description;
        const icon=answer.weather[0].icon
        const temp=answer.main.temp;
        const iconUrl=` https://openweathermap.org/img/wn/${icon}@2x.png`
        res.write("<img src="+iconUrl+" alt='photoImg'> ")
        res.write("<h2>the weather description of "+query+" is "+desc+"!</h2>")
        res.write("<p> And the temperature is "+temp +" degree</p>")
     res.send();
      })
    });
    
    
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error")
  }
}); 


app.listen(3000, function(){
    console.log("server is listening to port 3000 onu")
})