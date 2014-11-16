

define([
    'jquery',
    'backbone',
    'rapidizer',
    'models/wedding-invite'
], function($, Backbone, Rapidizer, model) {
    var WeddingInvites = Backbone.Collection.extend({
        model: model,
        url: '/submit/sam/wedding/rsvp',
        pagination : function(perPage, page) {
            page = page-1;
            var collection = this;
            collection = _(collection.rest(perPage*page));
            collection = _(collection.first(perPage));    
            return collection.map( function(model) { return model.toJSON() } )} 
    });

    return WeddingInvites
});

