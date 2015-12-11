
define([
    'jquery',
    'backbone',
    'rapidizer',
    'text!templates/wedding-invite/view.html'
], function ($, Backbone, Rapidizer, template, form) {
    var WeddingInvite = Backbone.View.extend({
        template: _.template(template),
        el: $('#content'),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
    return WeddingInvite;
});


