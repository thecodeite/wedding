
define([
    'jquery',
    'backbone',
    'rapidizer',
    'text!templates/home.html'    
], 
function ($, Backbone, Rapidizer, template) {
    var Home = Backbone.View.extend({
        el: $('#content'),
        render: function () {
            this.$el.html(template);

            
           
        }
    });
    return Home;
});


