

    define([
        'jquery',
        'backbone',
        'rapidizer'], 
    function($, Backbone, Rapidizer) {
    var WeddingInvite = Backbone.Model.extend({
        schema: { Name: { type: 'Text', validators: ['required'] }, Email: { type: 'Text', validators: ['email'] }, MobileNumber: { type: 'Text', validators: [/^[0-9\s\-\+\(\)]{1,20}$/ ]  }, Address: { type: 'TextArea' }, Attendance: { type: 'Select', options: ['Yes', 'No', 'Maybe'], validators: ['required'] }, SpecialRequirements: { type: 'TextArea'}, NameOfGuest: { type: 'Text' } },
        urlRoot: '/submit/sam/wedding/rsvp',
        url: function () {
            return '/submit/sam/wedding/rsvp/' + this.get('id');
        }
    });

    return WeddingInvite
});
