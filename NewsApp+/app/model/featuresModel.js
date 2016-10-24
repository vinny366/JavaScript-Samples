define(function (require) {
    "use strict";
    /*
     * CommonJS syntax rather than RequireJS syntax for dependency injection
     */
    var Backbone = require('backbone');
    var appConfig = require('appConfig');
    /**
     * Extending  the backbone model
     */
    var featuresModel = Backbone.Model.extend({
        /**
         * fetching the url string  from the appConfig.js file
         */
        url: appConfig.url.queryModel,
        /**
         * defining the Business rules for featuresModel
         */
        defaults: {
            "title": "",
            "data": [{
                "facility": "",
                "date": "",
                "reason": ""
            }]
        }
    });
    /**
     *  return the extended backbone model
     */
    return featuresModel;
});