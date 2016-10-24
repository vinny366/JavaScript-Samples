define(function (require) {
    "use strict";
    /*
     * CommonJS syntax rather than RequireJS syntax for dependency injection
     */
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var controller = require('controller');
    var AppRouter = Backbone.Marionette.AppRouter.extend({
        /*
         * list of routes and their appropriate callbacks
         */
        appRoutes: {
            "home": "home",
            "features": "features",
            "cricket": "cricket",
            "politics": "politics",
            "crime": "crime",
            "international":"international",
            '*default': 'default'
        }
    });
    /*
     * create router instance and pass the contoller
     */
    return new AppRouter({
        controller: controller
    });
});