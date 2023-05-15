var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var multer  = require('multer')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var img = req.body.img;
    var animal = req.body.animal;

    var data = {
        "name": name,
       "location":{
		"Type":"Point",
		"Coordinates":[latitude,longitude]
	   },
        "img" : img,
        "animal" : animal
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3001);



console.log("Listening on PORT 3001");



