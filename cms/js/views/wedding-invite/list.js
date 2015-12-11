
define([
    'jquery',
    'backbone',
    'rapidizer',
    'text!templates/wedding-invite/list.html'
], function ($, Backbone, Rapidizer, template) {
    var WeddingInvite = Backbone.View.extend({
        template: _.template(template),
        el: $('#content'),
        render: function () {
            this.$el.html(this.template(this.collection));
        }
    });
    return WeddingInvite;
});


