
define([
    'jquery',
    'backbone',
    'rapidizer',
    'backboneForm',
    'text!templates/wedding-invite/create.html',
    'models/wedding-invite',
], function ($, Backbone, Rapidizer, BackboneForm, template, WeddingInvite) {
    
    
    var WeddingInviteView = Backbone.View.extend({
        render: function () {                    
            this.model.render();
            this.$el.html(this.model.el);
        },
        events: {
            "click #CreateWeddingInviteButton": "formCreate"
        },
        formCreate: function (e) {
            e.preventDefault();

            var form = this.model;
            var $el = this.$el;

            var errors = form.commit(); // runs schema validation

            $el.find('.InProgress span').empty();
            $el.find('.InProgress').hide();

            if (!errors) {
                $el.find('.InProgress span').html('Updating...');
                $el.find('.InProgress').show();
                $el.find('.ValidationSummary').empty();

                form.model.save(null, {
                    success: function (model, msg, e) {
                        //reset the form
                        form.render();
                        $el.html(form.el);

                        //message success
                        $el.find('.ValidationSummary').html('<span>Success</span>');                        
                    },
                    error: function (model, msg, e) {
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').html('<span>Error</span>');
                    }
                });
            }
        }
    });
    return WeddingInviteView;
});


