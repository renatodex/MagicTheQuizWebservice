exports.model = Entity.create({

    store : [],

    add : function(id, object) {
        this.store.push({
            id: id, 
            value: object,
            score: 0
        });
    },

    get : function() {
        return this.store;
    },

    getById : function(id) {
        for(var i in this.store) {
            if(this.store[i].id == id)
                return this.store[i];
        }

        return false;
    },

    getHigher : function() {
        var higher_score = 0;
        var higher_obj = {};
        
        for(var i in this.store) {
            if(this.store[i].score > higher_score) {
                higher_obj = this.store[i];
                higher_score = this.store[i].score;
            }
        }

        return higher_obj;
    },
    
    count : function() {
        return this.store.length;
    },
    
    reset : function() {
        this.store = [];
    }
});