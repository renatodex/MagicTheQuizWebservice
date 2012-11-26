require.extensions[".json"] = function (m) {
    m.exports = (require('fs').readFileSync(m.filename, 'utf8'));
};

var http = require('http');
var https = require('https');
var fs = require('fs');
var _und = require('underscore');
var ejs = require('ejs');
var express = require('express');
global.json_choices = JSON.parse(require('./config/choices.json'));
global.json_questions = JSON.parse(require('./config/questions.json'));

var models = require('./models/init');
var WebResult = models.WebResult; 



var Validator = {
    checkIfAnswerIsFilled : function(answers){
        if(typeof(answers) != 'undefined') {
            return true;
        }  
        
        return false;
    },
    
    checkIfAnswersNumberIsEqual : function(answers) {
        if(answers.length == Questions.length) {
            return true;
        }        
        
        return false;
    }
}

var privateKey = fs.readFileSync('certificate_key.key').toString();
var certificate = fs.readFileSync('certificate.pem').toString();
var options = {
  key : privateKey
, cert : certificate
}


var app = express();
//var app_http = express();
//var app_https = module.exports = express.createServer({key: privateKey, cert: certificate});

//function setupServer(app) {
app.set( "jsonp callback", true );
app.get('/plainswalker', function(req, res){    
    try {
        var body;
        var answers = req.query['answers'];   
        console.log(answers);
        models.Bootstrap.init();   
        
        if(!Validator.checkIfAnswerIsFilled(answers)) {
            throw 'Param answers was not sent';
        }
    
        if(!Validator.checkIfAnswersNumberIsEqual(answers)) {
            throw 'Your response could not be understood.';
        }
        
        body = models.Quiz.process(Choices, Questions, answers);    
    } catch(err) {
        if((err.length) == undefined) {
            err = 'Ocorreu um erro. Tente mais tarde.';
        }
        
        body = WebResult.error(err);
    }
    
    res.jsonp(body);    
});

app.get('/questions', function(req, res) {
    var json_questions_clone = _und.clone(json_questions.results);
    var result = [];
    var answers_array = [];
    
    for(var i in json_questions_clone) {
        answers_array = [];
        for(var j in json_questions_clone[i].answers) {
            answers_array[j] = json_questions_clone[i].answers[j].text;
        }        
        
        result[i] = {
            question : json_questions_clone[i].question,
            answers : answers_array
        }
    }
    
    res.jsonp(result);
});
//}
//setupServer(app_http);
//setupServer(app_https);
//app_http.listen(5454);
//app_https.listen(5455);
app.listen(5454);
https.createServer(options,app).listen(5455);

console.log("Magic the Quiz Webservices rodando na porta 5454 (HTTPS: 443).");

