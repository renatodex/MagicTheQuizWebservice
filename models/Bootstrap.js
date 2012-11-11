var Collection = require('./Collection').model;
var Resposta = require('./Resposta').model;
var Pergunta = require('./Pergunta').model;


exports.model = Entity.create({
    init : function() {
        this.initChoices();
        this.initQuestions();
    },
		
    initChoices : function() {
        Choices = Collection.create();
        Choices.reset();
        
        
        for(var c in json_choices.results) {
            var choice_item = json_choices.results[c];
            Choices.add(choice_item.id, choice_item.value);
        }	
    },

    initQuestions : function() {
        Questions = [];
        var answers, final_question, text, i, j, k, final_answers;
        for(i in json_questions.results) {
            final_answers = [];
            final_question = json_questions.results[i].question;
            answers = json_questions.results[i].answers;

            for(j in answers) {
                text = answers[j].text;
                beneficiers = answers[j].beneficiers;
                final_answers[final_answers.length] = Resposta.create().setup(text, beneficiers);
            }

            Questions[Questions.length] = Pergunta.create().setup(final_question, final_answers);    
        }
    }
})