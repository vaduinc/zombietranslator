define(['jquery', 'RuleProcessorService'], function($, RuleProcessorService){
//$(document).ready(function(){

  var TranslatorView = function(){

      this.ruleProcService = new RuleProcessorService();

      this.translate();
      this.zombify();
      console.log("tres");
  };

  TranslatorView.prototype.translate = function(){

      var that = this;
      //$('#english-to-zombie-btn').click(function(event){
      //    that.zombify();
      //    return false;
      //});

      $('#english').on("keyup", function(){
          that.zombify();
      });

  }

  //$('#zombie-to-english-btn').click(function(event){
  //  unzombify();
  //  return false;
  //});


  TranslatorView.prototype.zombify = function () {

    var that = this;
    var original = $('#english').val();
    var resultTranslation = '';

    for (var index = 0 ; index < original.length ; index++){
        resultTranslation = that.ruleProcService.runRules(original.substring(0,index+1),resultTranslation);
    }

    $('#zombie').val(resultTranslation);

    // 1. lower-case "r" at the end of words replaced with "rh". car los !
    // 2. an "a" or "A" by itself will be replaced with "hra".
    // 3. the starts of sentences are capitalised (the "start of a sentence" is any occurrence of
    //   ".!?", followed by a space, followed by a letter.)
    // 4. "e" or "E" is replaced by "rr"
    // 5. "i" or "I" is replaced by "rrRr"
    // 6. "o" or "O" is replaced by "rrrRr"
    // 7. "u" or "U" is replaced by "rrrrRr"
    // 8. "r" or "R' is replaced by "RR"


  };

  //function unzombify(){
  //    // TODO implementation
  //};

    return TranslatorView;

});
