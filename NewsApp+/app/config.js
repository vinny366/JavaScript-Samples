// Set the require.js configuration for your application.
require.config({
    // Initialize the application with the main application file
    deps: ["main"],
    /*
    * Set the require.js configuration for your application.
    */
    
    /*
    * disables the timeout
    */
    waitSeconds: 0,
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        jqueryUI: {
            deps: ["jquery"],
            exports: "jqueryUI"
        },
        dotdot: {
            deps: ["jquery"],
            exports: "dotdot"
        },
        underscore: {
            deps: [],
            exports: '_'
        },
        handlebars: {
            deps: [],
            exports: 'Handlebars'
        },
        backbone: {
            deps: ['underscore', 'handlebars', 'jquery'],
            exports: 'Backbone'
        },
        wreqr: {
            deps: ['backbone'],
            exports: 'wreqr'
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        vent: {
            deps: ["marionette"],
            exports: "vent"
        },
        util: {
            deps: ["jquery"],
            exports: "util"
        },
        handlebars_helpers: {
            deps: ["jquery"]
        }
    },
    paths: {
        jquery: '../libs/jquery/jquery',
        bootstrap: '../libs/bootstrap/bootstrap',
        jqueryUI: '../libs/jquery/jquery-ui',
        dotdot: '../libs/jquery/dotdotdot',
        underscore: '../libs/underscore/underscore',
        handlebars: '../libs/handlebars/handlebars',
        backbone: '../libs/backbone/backbone',
        wreqr: '../libs/backbone/wreqr',
        util: '../libs/util/util',
        marionette: '../libs/backbone/backbone.marionette',
        vent: '../libs/backbone/vent',
        text: "../libs/backbone/text",
        appConfig: "view/common/appConfig"
    }
});