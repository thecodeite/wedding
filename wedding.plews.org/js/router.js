
// Filename: router.js
define([
    'jquery',
    'backbone',
    'rapidizer',
    'views/home',        
    'views/wedding-invite/create'        
], function ($, Backbone, Rapidizer, HomeView, CreateWeddingInviteView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;

        
        app_router.on('route:defaultAction', function () {

            require(["models/wedding-invite", "text!templates/wedding-invite/create.html", "backboneForm"], function (WeddingInvite, template, BackboneForms) {
                var weddinginvite = new WeddingInvite;

                var WeddingInviteForm = new Backbone.Form({
                    model: weddinginvite,
                    el: $("#content"),
                    template: _.template(template)
                });

                var createweddinginviteview = new CreateWeddingInviteView({ model: WeddingInviteForm, el: WeddingInviteForm.el });
                createweddinginviteview.render();
            });
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});

