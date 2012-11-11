exports.model = Entity.create({
    final_choice : '',
    graphic_data : {},
    
    setGraphicData : function(value) {
        this.graphic_data = value;
    },
    
    getGraphicData : function() {
        return this.graphic_data;
    },
    
    setFinalChoice : function(value) {
        this.final_choice = value;
    },
    
    getFinalChoice : function() {
        return this.final_choice;
    },
    
    toString : function() {
        return {
            result : {
                final_choice : this.getFinalChoice(),
                graphic_data : this.getGraphicData()
            }
        }
    },
    
    error : function(message) {
        return {
            result : {
                error : message
            }
        }
    }
});