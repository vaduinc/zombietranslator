define(['Rule','RuleResult','RulesDefinition'], function(Rule,RuleResult,RulesDefinition){
 var ruleRR,ruleR,ruleA,ruleNewSentence,ruleE,ruleI,ruleO,ruleU,ruleNew1,ruleNew2,ruleNew3;
 var rulesDefs;

    beforeEach(function(){

        new RulesDefinition(); // Make the constructor run, so rules are defined
        rulesDefs = RulesDefinition.getRuleCollection();

        ruleRR =rulesDefs[0];
        ruleR = rulesDefs[1];
        ruleA = rulesDefs[2];
        ruleNewSentence = rulesDefs[3];
        ruleE =rulesDefs[4];
        ruleI =rulesDefs[5];
        ruleO =rulesDefs[6];
        ruleU =rulesDefs[7];
        ruleNew1 =rulesDefs[8];
        ruleNew2 =rulesDefs[9];
        ruleNew3 =rulesDefs[10];

    });


  describe('Rules', function(){

    describe('Make sure each rule returns the expected value when test it by itself', function(){

          it('should capitalized new sentences ".!?space[a-z]"', function(){
              var ruleResult = ruleNewSentence.execute('. s',2,'');
              expect(ruleResult.transformed).toBe('. S');

              ruleResult = ruleNewSentence.execute('! s',2,'');
              expect(ruleResult.transformed).toBe('! S');

              ruleResult = ruleNewSentence.execute('? s',2,'');
              expect(ruleResult.transformed).toBe('? S');
          });


          it('should replace last "r" by "rh" ', function(){
              var ruleResult = ruleR.execute('r',0,'');
              expect(ruleResult.transformed).toBe('rh');
          });

          it('should replace "rt" by "RR" ', function(){
              var ruleResult = ruleR.execute('rt',0,'');
              expect(ruleResult.transformed).toBe('RR');
          });

          it('should replace "R" by "RR" ', function(){
              var ruleResult = ruleRR.execute('R',1,'');
              expect(ruleResult.transformed).toBe('RR');
          });

          it('should replace "a" by "hra" ', function(){
              var ruleResult = ruleA.execute('a',1,'');
              expect(ruleResult.transformed).toBe('hra');
          });

          it('should replace "e" or "E" by "rr" ', function(){

              var ruleResult = ruleE.execute('e',1,'');
              expect(ruleResult.transformed).toBe('rr');

              ruleResult = ruleE.execute('E',1,'');
              expect(ruleResult.transformed).toBe('rr');
          });

          it('should replace "i" or "I" by "rrRr" ', function(){

              var ruleResult = ruleI.execute('i',1,'');
              expect(ruleResult.transformed).toBe('rrRr');

              ruleResult = ruleI.execute('I',1,'');
              expect(ruleResult.transformed).toBe('rrRr');
          });

          it('should replace "o" or "O" by "rrrRr" ', function(){

              var ruleResult = ruleO.execute('o',1,'');
              expect(ruleResult.transformed).toBe('rrrRr');

              ruleResult = ruleO.execute('O',1,'');
              expect(ruleResult.transformed).toBe('rrrRr');
          });

          it('should replace "u" or "U" by "rrrrRr" ', function(){

              var ruleResult = ruleU.execute('u',1,'');
              expect(ruleResult.transformed).toBe('rrrrRr');

              ruleResult = ruleU.execute('U',1,'');
              expect(ruleResult.transformed).toBe('rrrrRr');
          });

          it('should replace "x" or "X" by "GRrr" ', function(){

              var ruleResult = ruleNew1.execute('x',1,'');
              expect(ruleResult.transformed).toBe('GRrr');

              ruleResult = ruleNew1.execute('X',1,'');
              expect(ruleResult.transformed).toBe('GRrr');
          });

          it('should replace "w" or "W" by "Pappa" ', function(){

              var ruleResult = ruleNew2.execute('w',1,'');
              expect(ruleResult.transformed).toBe('Pappa');

              ruleResult = ruleNew2.execute('W',1,'');
              expect(ruleResult.transformed).toBe('Pappa');
          });


          it('should replace "c" or "C" by "Mem" ', function(){

              var ruleResult = ruleNew3.execute('c',1,'');
              expect(ruleResult.transformed).toBe('Mem');

              ruleResult = ruleNew3.execute('C',1,'');
              expect(ruleResult.transformed).toBe('Mem');
          });

      });
  });

});
