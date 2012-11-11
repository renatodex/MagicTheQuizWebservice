exports.model = Entity.create({
    text : '',
    beneficiers : [],

    getText : function() {
        return this.text;
    },

    getBeneficiers : function() {
        return this.beneficiers;
    },

    setup : function(texto_resposta, beneficiers) {
        this.text = texto_resposta;
        this.beneficiers = beneficiers;
        return this;
    },

    process : function() {
        var temp;
        for(var i in this.beneficiers) {
            temp = Choices.getById(this.beneficiers[i]);
            temp.score++;
        }
    }
});