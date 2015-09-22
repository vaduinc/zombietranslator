define(['RuleProcessorService','RuleResult'], function(RuleProcessorService,RuleResult){
  var ruleProcessorService;

  describe('RuleProcessorService', function(){

      describe('ruleProcessorService', function(){
          it('should replace "jaime. reyes pal" by "jhrarrRrmrr. Rrryrrs phral" ', function(){

              ruleProcessorService = new RuleProcessorService();
              targetOuput = ruleProcessorService.translate('jaime. reyes pal');

              expect(targetOuput).toBe('jhrarrRrmrr. Rrryrrs phral');
          });

      });

  });

});
