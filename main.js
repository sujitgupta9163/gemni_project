// Make sure to include these imports:
const { GoogleGenerativeAI } = require ("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/' , (req, res)=>{
  res.send("hello world !!! ")
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "tell me somthing about virat kohli.";

const generate = async(prompt)=>{
  try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
  }catch(err){
    console.log(err);
  }
}

app.get('/api/content' , async (req, res)=>{
  const data = req.body.question;
  const result = await generate(data);

  res.send({
    "result" : result
  })
})

app.listen(3000 , ()=>{
  console.log("server is running ")
})

