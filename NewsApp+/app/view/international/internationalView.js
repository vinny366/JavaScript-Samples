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
     var internationalModel = require('model/internationalModel');
     var internationalTmpl = require('text!view/international/internationalTmpl.html');
     var appConfig = require('appConfig');
     /**
      * creating a sub view - Cricket
      */
     var internationalView = Backbone.Marionette.ItemView.extend({
         template: Handlebars.compile(internationalTmpl),
         model: new internationalModel(),
         className: 'demoViewClass',
         initialize: function () {
             var template = this.template;
             this.model.url = appConfig.url.queryModel
             /**
              * fetching the data from the model
              */
             this.model.fetch({
                 data:{
                    q : 'select * from rss where url ="http://in.news.yahoo.com/rss/politics"',
                    format : 'json'
                 },
                 success: function (data) {
                     $('#international').html(template({
                         "data": data.toJSON()
                     }));
                      $('.newDescription').dotdotdot();
                 }
             });
         }
     });
     return internationalView;
 });
