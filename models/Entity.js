var xtend = require('xtend');

exports.model = {
    create : function(object) {
        var merged_object = object || {};
        return xtend(merged_object, this);
    }
};