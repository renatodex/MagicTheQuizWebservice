exports.model = Entity.create({
    answers : [],
    question : '',

    setup : function(pergunta, respostas) {
        this.question = pergunta;
        this.answers = respostas;
        return this;
    },

    answer : function(key) {
        var resposta = this.answers[key-1];
        resposta.process();
    },

    getQuestion : function() {
        return this.question;
    },

    getAnswers : function() {
        var result = '';
        for(var i in this.answers) {
            result += [Number(i)+1,') ', this.answers[i].getText(), '\n'].join('');
        }

        return result;
    }
});