/**
 * Created by jaimevalencia on 9/19/15.
 */

requirejs.config({
    "baseUrl": "js/app",
    "paths": {
        "jquery": "../vendors/jquery.min",
        "bootstrap": "../vendors/bootstrap.min"
    },
    "shim": {
        "bootstrap": ["jquery"]
    }
});

require(['jquery', 'TranslatorView', 'bootstrap'], function($, TranslatorView){

    $(function(){
        var translatorView = new TranslatorView();
    });

});