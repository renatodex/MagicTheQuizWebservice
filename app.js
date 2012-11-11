require.extensions[".json"] = function (m) {
    m.exports = (require('fs').readFileSync(m.filename, 'utf8'));
};

var ejs = require('ejs');
var express = require('express');
global.json_choices = JSON.parse(require('./config/choices.json'));
global.json_questions = JSON.parse(require('./config/questions.json'));

var models = require('./models/Init');
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

var app = express();
app.get('/plainswalker', function(req, res){    
    try {
        var body;
        var answers = req.query['answers'];    
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
    
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));    
});

app.listen(5454);