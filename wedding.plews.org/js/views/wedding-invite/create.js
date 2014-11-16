
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

            var datafields = this.$el.find('[data-fields]');

            $.each(datafields, function(index, value) {
                var thisEl = $(value);
                var label = thisEl.find('label');
                var labelName = $.trim(label.html());

                label.remove();

                thisEl.find('input,textarea').attr('placeholder', labelName);

                thisEl.find('textarea').attr('rows', 4);

                $("<option>", { value: '', text: labelName, selected: true }).prependTo(thisEl.find('select'));
            });
            
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
                $el.find('.InProgress span').html('Sending...');
                $el.find('.InProgress').show();
                $el.find('.ValidationSummary').empty();

                form.model.save(null, {
                    success: function (model, msg, e) {
                        //reset the form
                        form.render();
                        $el.html(form.el);

                        var datafields = this.$el.find('[data-fields]');

                        $.each(datafields, function(index, value) {

                            var thisEl = $(value);
                            var label = thisEl.find('label');
                            var labelName = $.trim(label.html());

                            label.remove();

                            thisEl.find('input,textarea').attr('placeholder', labelName);

                            thisEl.find('textarea').attr('rows', 4);

                            $("<option>", { value: '', text: labelName, selected: true }).prependTo(thisEl.find('select'));
                        });
                        
                        //message success
                        $el.find('.ValidationSummary').html('<span>Thanks, we have received your RSVP!</span>');                        
                    },
                    error: function (model, msg, e) {
                        $el.find('.InProgress').hide();
                        $el.find('.ValidationSummary').html('<span>Hmmmm, something went wrong. Probably best if you give us a ring or email us to confirm your RSVP :S</span>');
                    }
                });
            }
        }
    });
    return WeddingInviteView;
});


