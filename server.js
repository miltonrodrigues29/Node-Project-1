var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io  = require('socket.io')(http)
var mongoose = require('mongoose')
const { sendStatus } = require('express/lib/response')
var dbUrl = 'mongodb+srv://milton:AYu4WEzQVHwf9zrP@cluster0.e94j7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var Message = mongoose.model('Message',{
    name:String,
    message:String             //mongoose object schema //more like dictionary patter //key value pairs//use model method of mongoose to define the schema for the database no sql data base
})

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = 3000

// var messages = [
//     // {
//     //     name:'Milton',message:"Hi"
//     // }
//     // ,
//     // {
//     //     name:'Milton R',message:"Hello"
//     // }
// ]

app.get('/messages',(req,res)=>
{
    Message.find({},(err,messages)=>
    {
        res.send(messages)
    })

})

app.post('/messages',(req,res)=>
{   
    var message = new Message(req.body)
    message.save((err)=>
    {
        if(err)
        {
            sendStatus(500)
        }
        else
        {
            io.emit('message',req.body)
            res.sendStatus(200)
        }
    })
    
})

io.on('connection',(socket)=>{

    console.log('a user connected');
})

mongoose.connect(dbUrl,(err)=>{
    if (!err)
    {
        console.log("MongoDb Connection Done")
    }
    else
    {
        console.log("Error connecting mongodb")   // use connect callback method of mongoose to connect the mongodb
    }
   
})

http.listen(server,()=>
{
    console.log("Server running on: ",server)
})
