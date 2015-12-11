
define([
    'jquery',
    'backbone',
    'rapidizer',
    'backboneForm',
    'text!templates/wedding-invite/edit.html',
    'models/wedding-invite'
], function ($, Backbone, Rapidizer, BackboneForm, template, WeddingInvite) {

    var WeddingInviteView = Backbone.View.extend({
        render: function () {                    
            this.model.render();
            this.$el.html(this.model.el);
        },
        events: {
            "click #UpdateWeddingInviteButton": "formUpdate",
            "click #DeleteWeddingInviteButton": "formDelete"
        },
        formUpdate: function (e) {
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
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').html('<span>Success</span>');
                    },
                    error: function (model, msg, e) {
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').html('<span>Error</span>');
                    }
                });
            }
        },
        formDelete: function (e) {
            e.preventDefault();

            var form = this.model;
            var $el = this.$el;

            $el.find('.InProgress span').empty();
            $el.find('.InProgress').hide();
            $el.find('.ValidationSummary').html('<span>Are you sure? <a class="DeleteYes" href="#">Yes</a> <a class="DeleteNo" href="#">No</a></span>');

            this.$el.find('.DeleteYes').click(function (e) {
                e.preventDefault();

                $el.find('.InProgress span').html('Deleting...');
                $el.find('.InProgress').show();
                $el.find('.ValidationSummary').empty();

                form.model.destroy(null, {
                    success: function (model, msg, e) {
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').empty();
                        $el.find('.ValidationSummary').html('<span>Deleted</span>');
                    },
                    error: function (model, msg, e) {
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').empty();
                        $el.find('.ValidationSummary').html('<span>Error</span>');
                    }
                });
            });

            $el.find('.DeleteNo').click(function (e) {
                e.preventDefault();
                $el.find('.ValidationSummary').empty();
            });
        }
    });
    return WeddingInviteView;
});
