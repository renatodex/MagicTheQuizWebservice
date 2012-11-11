var WebResult = require('./WebResult').model;

exports.model = Entity.create({
    process : function(Choices, Questions, Answers) {		
        for(var i in Choices.store) {
            Choices.store[i].score = 0;
        }
        
        var question_obj;
        for(var k in Questions) {
            question_obj = Questions[k];
            question_obj.answer(Answers[k]);	
        }

        var final_choice = Choices.getHigher().value;
        var graphic_data = Choices.get();
        
        var result = WebResult.create();
        result.setFinalChoice(final_choice);
        result.setGraphicData(graphic_data);
        
        return result.toString();
    }
})