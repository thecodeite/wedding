require.config({
    paths: {
        jquery: 'libs/jquery-min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        backboneForm: 'libs/backbone-forms-min',
        easyxdm: 'libs/easyxdm/easyXDM',
        rapidizer: 'libs/rapidizer',
        templates: '../templates'
    },
    shim: {
        backbone: {
            deps: ["underscore"],
            exports: "Backbone"
        },
        backboneForm: {
            deps: ["backbone"],
            exports: "BackboneForm"
        },
        underscore: {
            exports: "_"
        }
    }
});
//the "main" function to bootstrap your code
require(['jquery', 'backbone', 'backboneForm', 'rapidizer', 'app'], function ($, Backbone, BackboneForm, Rapidizer, App) {
    App.initialize();
});