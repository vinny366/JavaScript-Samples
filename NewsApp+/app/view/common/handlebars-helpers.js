/***************************************************************************************/
/* Author            :Cognizant Technology Solutions  */
/* FileName          :handlebars-helpers.js  */
/***************************************************************************************/

define(function(require) {
   
    /*
    * CommonJS syntax rather than RequireJS syntax for dependency injection
    */
    var handlebars = require('handlebars');  
    var appConfig = require('appConfig');
    /* Check Status for intervention */
    Handlebars.registerHelper('newdescription', function (items) {
        var htmlString='';
        if(items){
            htmlString +='<p class="newDescription">';
            htmlString +=items.replace(/(<([^>]+)>)/ig,"");
            htmlString +='</p>';
        }
        return htmlString;
    }); 
    return Handlebars;
});
