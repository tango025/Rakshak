var express = require('express');
var app = express();
var logger  = require("morgan");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");
var serviceAccount = require("./rakshak-safety-for-women-firebase-adminsdk-7jl4e-3db0f2e986.json");
var cors = require("cors");
var firebase = require("firebase");

app.use(cors({origin:true}));
var config = {
	apiKey: "AIzaSyBlNAlMOntxrjQkYuZeU_2YYSjWiNTAKNw",
	authDomain: "rakshak-safety-for-women.firebaseapp.com",
	databaseURL: "https://rakshak-safety-for-women.firebaseio.com",
	projectId: "rakshak-safety-for-women",
	storageBucket: "rakshak-safety-for-women.appspot.com",
	messagingSenderId: "332627518478"
};
firebase.initializeApp(config);


var firebaseAdmin = admin.initializeApp({
	credential : admin.credential.cert(serviceAccount),
	databaseURl : "https://rakshak-safety-for-women.firebaseio.com"
});

	function isAuthenticated(req,res,next){
		var user = firebase.auth().currentUser;
	       if (user !== null) {
	         req.user = user;
	         next();
	       } else {
	         res.redirect('/login');
	       }
	     }


// app.use(isAuthenticated);
app.use(logger('dev'));
app.use(cors());
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('views'));



app.get("/login",function(req,res){
	res.render("login.ejs");
});

app.post("/login",function(req,res){
	var user = req.body.email;
	// console.log(firebase.auth().currentUser.email);
	res.render("location.ejs",{ data:user});

})

app.listen(8080,function(){
	console.log("listen");
})
