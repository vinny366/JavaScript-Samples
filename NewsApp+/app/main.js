define(function (require) {
    "use strict";
    /*
     * CommonJS syntax rather than RequireJS syntax for dependency injection
     */
    var $ = require('jquery');
    var App = require('app');
    var router = require('router');
    var appConfig = require('appConfig');
    $(function () {
        /*
         * Fetching tab JSON which will be used in creating tabs
         */
            $.ajax({
                url: appConfig.url.tabUrl,
                id:"tabUrlAjaxId",
                type: "GET",
                "data": {
                    'loginName': sessionStorage.careTeamName
                },
                dataType: "text",
                success: function (response) {
                    /*
                     * Add the tab JSON response to session
                     */
                    var resData = JSON.parse(response);
                    sessionStorage.tabJson = response;
                    /*
                     * Add router to application
                     */
                    App.Router = router;
                    /*
                     * Start the app
                     */
                    App.start();

                },
                error: function () {}
            });
    });
});