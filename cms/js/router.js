
// Filename: router.js
define([
    'jquery',
    'backbone',
    'rapidizer',
    'views/home',        
    'views/wedding-invite/create',        
    'views/wedding-invite/edit',        
    'views/wedding-invite/list',        
    'views/wedding-invite/view'        
], function ($, Backbone, Rapidizer, HomeView, CreateWeddingInviteView, EditWeddingInviteView, ListWeddingInviteView, ViewWeddingInviteView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'Home': 'showHome',
            'CreateWeddingInvite': 'showCreateWeddingInvite',
            'EditWeddingInvite/:id': 'showEditWeddingInvite',
            'ListWeddingInvite': 'showListWeddingInvite',
            'ViewWeddingInvite/:id': 'showViewWeddingInvite',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;

        
        app_router.on('route:showHome', function (id) {
            var homeview = new HomeView();
            homeview.render();

        });
        
        app_router.on('route:showCreateWeddingInvite', function (id) {
            require(["models/wedding-invite", "text!templates/wedding-invite/create.html", "backboneForm"], function (WeddingInvite, template, BackboneForms) {
                var weddinginvite = new WeddingInvite;

                var WeddingInviteForm = new Backbone.Form({
                    model: weddinginvite,
                    el: $("#content"),
                    template: _.template(template)
                });

                var createweddinginviteview = new CreateWeddingInviteView({model: WeddingInviteForm, el: WeddingInviteForm.el});
                createweddinginviteview.render();
            });

        });
        
        app_router.on('route:showEditWeddingInvite', function (id) {
            require(["models/wedding-invite", "text!templates/wedding-invite/edit.html", "backboneForm"], function (WeddingInvite, template, BackboneForms) {
                var weddinginvite = new WeddingInvite({id: id});
                weddinginvite.fetch({
                    success: function (data) {
                        var WeddingInviteForm = new Backbone.Form({
                            model: weddinginvite,
                            el: $("#content"),
                            template: _.template(template)
                        });

                        var editweddinginviteview = new EditWeddingInviteView({model: WeddingInviteForm, el: WeddingInviteForm.el});
                        editweddinginviteview.render();
                    },
                    error: function(data) {
                        alert('Error fetching WeddingInvite');
                    }
                });
            });

        });
        
        app_router.on('route:showListWeddingInvite', function (id) {
            
            require(["collections/wedding-invite"], function (WeddingInvites) {
                
                var weddinginvites = new WeddingInvites;
                weddinginvites.fetch({
                    success: function (data) {
                        var listweddinginviteview = new ListWeddingInviteView({collection:data});
                        listweddinginviteview.render();
                    },
                    error: function (data) {
                        alert('Error fetching weddinginvites');
                    }
                });
            });
            

        });
        
        app_router.on('route:showViewWeddingInvite', function (id) {
            require(["models/wedding-invite"], function (WeddingInvite, template, BackboneForms) {
                var weddinginvite = new WeddingInvite({id: id});
                weddinginvite.fetch({
                    success: function (data) {
                        var viewweddinginviteview = new ViewWeddingInviteView({model: weddinginvite});
                        viewweddinginviteview.render();
                    },
                    error: function(data) {
                        alert('Error fetching WeddingInvite');
                    }
                });
            });

        });
        app_router.on('route:defaultAction', function () {

            // We have no matching route, lets display the home page 
            var homeView = new HomeView();
            homeView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});

