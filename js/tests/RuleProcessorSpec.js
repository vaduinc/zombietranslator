define(['RuleProcessorService','RuleResult'], function(RuleProcessorService,RuleResult){
  var ruleProcessorService;

  describe('RuleProcessorService', function(){

      beforeEach(function(){

          ruleProcessorService = new RuleProcessorService();

      });

      describe('ruleProcessorService', function(){
          it('should replace "Terror" by "TrrRRRRrrrRrrh" ', function(){

              targetOuput = ruleProcessorService.translate('Terror');

              expect(targetOuput).toBe('TrrRRRRrrrRrrh');
          });

          it('should replace "JaZahn" by "JhraZhrahn" ', function(){

              targetOuput = ruleProcessorService.translate('JaZahn');

              expect(targetOuput).toBe('JhraZhrahn');
          });

          it('should replace "petty" by "prrtty" ', function(){

              targetOuput = ruleProcessorService.translate('petty');

              expect(targetOuput).toBe('prrtty');
          });

          it('should replace "pretty" by "pRRrrtty" ', function(){

              targetOuput = ruleProcessorService.translate('pretty');

              expect(targetOuput).toBe('pRRrrtty');
          });

          it('should replace "brains" by "bRRhrarrRrns" ', function(){

              targetOuput = ruleProcessorService.translate('brains');

              expect(targetOuput).toBe('bRRhrarrRrns');
          });

          it('should replace "onomatopoeia" by "rrrRrnrrrRrmhratrrrRrprrrRrrrrrRrhra" ', function(){

              targetOuput = ruleProcessorService.translate('onomatopoeia');

              expect(targetOuput).toBe('rrrRrnrrrRrmhratrrrRrprrrRrrrrrRrhra');
          });

      });

  });

});
