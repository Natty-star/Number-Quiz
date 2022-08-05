var express = require('express');
var app = express();
var questions = require('./db.js');
console.log(questions.questions);
console.log(questions.answers);
const ques = questions.questions;
const ans = questions.answers;

app.set("view engine","pug");

var count = -1;
var score = 0
app.get('/', (req,res)=>{
    //var count = 0;
    if(req.query){
        if(count == 3){
            count = 0;
            res.render('result',{score} );
            score = 0;
            
        }
        if(ans[count] == req.query.answer){
            score++;
        }
        count++;
    }
    res.render('index',{question:ques[count],score});
})

// app.post('/',(req,res)=>{
//     console.log(req.body);
//     console.log("her we go")
// })


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});