var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("DB Connected"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

app.get('/form', (req, res) => {
	imgSchema.find({})
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('imagepage',{items: data})
	})
});

app.get('/heatmap', (req, res) => {
	imgSchema.find({})
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('heatmap',{items: data})
	})
});

app.get('/show', (req, res) => {
	imgSchema.find({})
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('viewallrecord',{items: data})
	})
});

app.get('/groupshow', (req, res) => {
	imgSchema.aggregate([
		{ $group: { _id: '$name', image: { $first: '$img' } } }
	  ])
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('groupshow',{items: data})
	})
});

app.get('/groupshow2', (req, res) => {
	imgSchema.aggregate([
		{ $group: { _id: '$animal', image: { $first: '$img' } } }
	  ])
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('groupshow2',{items: data})
	})
});



app.get('/', (req, res) => {
	imgSchema.find({})
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('imagepage',{items: data})
	})
});


app.post('/single1', upload.single('image'), (req, res, next) => {

	var obj = {
		sub: req.body.sub
	}
	var a =req.body.cars
	imgSchema.find({ "name" : req.body.sub})
	.then ((data, err) => {
		if (err) {
			console.log(err);
		}
			// item.save();
			res.render('showsingle',{items: data})
	});
});

app.post('/single2', upload.single('image'), (req, res, next) => {

	var obj = {
		sub: req.body.sub
	}
	var a =req.body.cars
	imgSchema.find({ "animal" : req.body.sub})
	.then ((data, err) => {
		if (err) {
			console.log(err);
		}
			// item.save();
			res.render('showsingle',{items: data})
	});
});

app.post('/single2', upload.single('image'), (req, res, next) => {

	var obj = {
		sub: req.body.sub
	}
	var a =req.body.cars
	imgSchema.find({ "animal" : req.body.sub})
	.then ((data, err) => {
		if (err) {
			console.log(err);
		}
			// item.save();
			res.render('showsingle',{items: data})
	});
});

app.post('/', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		lat:req.body.lat,
		lng:req.body.lng,
		location: {
			type: 'Point',
			coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
		  },
		animal:req.body.animal,
		
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgSchema.create(obj)
	.then ((err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});

var port = process.env.PORT || '3001'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})
