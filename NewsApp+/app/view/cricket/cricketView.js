 /***************************************************************************************/
 /* Author            :Cognizant Technology Solutions  */
 /* FileName          :cricketView.js  */
 /***************************************************************************************/
 define(function (require) {
     "use strict";
     /*
      * CommonJS syntax rather than RequireJS syntax for dependency injection
      */
     var $ = require('jquery');
     var Handlebars = require('handlebars');
     var dotdot = require('dotdot');
     var Backbone = require('backbone');
     var Marionette = require('marionette');
     var AdmissionHistorySummaryModel = require('model/cricketModel');
     var admissionHistoryTmpl = require('text!view/cricket/cricketTmpl.html');
     var appConfig = require('appConfig');
     /**
      * creating a sub view - Cricket
      */
     var cricketView = Backbone.Marionette.ItemView.extend({
         template: Handlebars.compile(admissionHistoryTmpl),
         model: new AdmissionHistorySummaryModel(),
         className: 'demoViewClass',
         initialize: function () {
             var template = this.template;
             this.model.url = appConfig.url.queryModel
             /**
              * fetching the data from the model
              */
             this.model.fetch({
                 data:{
                    q : 'select * from rss where url ="http://in.news.yahoo.com/rss/cricket"',
                    format : 'json'
                 },
                 success: function (data) {
                     $('#cricket').html(template({
                         "data": data.toJSON()
                     }));
                      $('.newDescription').dotdotdot();
                 }
             });
         }
     });
     return cricketView;
 });
