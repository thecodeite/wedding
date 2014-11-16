

    define([
        'jquery',
        'backbone',
        'rapidizer'], 
    function($, Backbone, Rapidizer) {
    var WeddingInvite = Backbone.Model.extend({
        schema: {
            Name: { type: 'Text', title: 'Your Name', validators: ['required'] },
            Email: { type: 'Text', validators: ['email'] },
            MobileNumber: { type: 'Text' },
            Address: { type: 'TextArea' },
            CanYouCome: {
                title: 'Can You Come?',
                type: 'Select', 
                options: [
                /*
                { 'val': 'yes', 'label': 'Yes, we can come!' },
                { 'val': 'no', 'label': 'No, we can\'t make it :(' },
                { 'val': 'maybe', 'label': 'We might be able to come...' }
                */
                { 'val': 'yes_bells', 'label': 'Will be there with bells on!' },
                { 'val': 'yes_nobells', 'label': 'Will be there, but I don\'t do bells' },
                { 'val': 'yes', 'label': 'Will be there, still undecided about bells' },
                { 'val': 'maybe', 'label': 'We\'re not sure, we have to check some bells' },
                { 'val': 'no_bells', 'label': 'Sorry can\'t be there, heard about the bells' },
                { 'val': 'no_nobells', 'label': 'Sorry can\'t be there, with or without bells' },

                ], validators: ['required']
            },
            SpecialRequirements: { type: 'TextArea', 'title': 'Special Requirements (incl. special dietary requirements)' },
            NameOfGuest: { title: 'Name Of Additional Guest(s)', type: 'Text' }
    },
        urlRoot: '/submit/sam/wedding/rsvp',
        url: function () {
            return '/submit/sam/wedding/rsvp/' + this.get('id');
        }
    });

    return WeddingInvite
});
