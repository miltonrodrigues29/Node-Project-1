var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = 3000

var messages = [
    // {
    //     name:'Milton',message:"Hi"
    // }
    // ,
    // {
    //     name:'Milton R',message:"Hello"
    // }
]

app.get('/messages',(req,res)=>
{
    res.send(messages);
})

app.post('/messages',(req,res)=>
{   
    console.log(req)
    try{
        messages.push(req.body)
    }
    catch{
        console.log("error")
    }
    console.log(req.body)
    
    res.sendStatus(200)
})

app.listen(server,()=>
{
    console.log("Server running on: ",server)
})
