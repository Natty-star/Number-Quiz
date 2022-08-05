var express = require('express');
var app = express();
var path = require('path');
var sessions = require('express-session');

var questions = require('./db.js');

const ques = questions.questions;
const ans = questions.answers;

app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join( __dirname, '/public')));
app.use(express.urlencoded({extended:false}));

app.set("view engine","pug");

var count = 0;
var score = 0;
var session;

const oneDay = 1000*60*60*24;

app.use(sessions({
    secret: "salt for cookie signnig",
    saveUninitialized: true,
    cookie:{maxAge:oneDay},
    resave: false
}));

app.get('/', (req,res)=>{
    session = req.session;
    if(session.count || session.score){
        count = session.count;
        score = session.score;
    }
    res.render('index',{question:ques[count],score});
})

app.post('/',(req,res)=>{
    if(count != 3){
        if(ans[count] === parseInt(req.body.answer)){
            score++;
        }
        count++
        res.render('index',{question:ques[count],score})
    }else{
        if(ans[count] === parseInt(req.body.answer)){
            score++;
        }
        count = 0;
        res.render('result',{score})
        score = 0;
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});