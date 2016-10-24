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
     var AdmissionHistorySummaryModel = require('model/crimeModel');
     var admissionHistoryTmpl = require('text!view/crime/crimeTmpl.html');
     var appConfig = require('appConfig');
     /**
      * creating a sub view - Cricket
      */
     var crimeView = Backbone.Marionette.ItemView.extend({
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
                    q : 'select * from rss where url ="http://in.news.yahoo.com/rss/crime"',
                    format : 'json'
                 },
                 success: function (data) {
                    console.log(data.toJSON())
                     $('#crime').html(template({
                         "data": data.toJSON()
                     }));
                      $('.newDescription').dotdotdot();
                 }
             });
         }
     });
     return crimeView;
 });
