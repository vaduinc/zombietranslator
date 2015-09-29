/**
 * Created by jaimevalencia on 9/19/15.
 */
define(['Rule', 'RuleResult','RulesDefinition'], function(Rule,RuleResult,RulesDefinition){

    var RuleProcessorService = function(){
        new RulesDefinition(); // Make the constructor run, so rules are defined
        this.rules = RulesDefinition.getRuleCollection();
    };

    RuleProcessorService.prototype.translate = function(source){

        var that = this;
        var resultTranslation ='';
        for (var index = 0 ; index < source.length ; index++){
            resultTranslation = that.runRules(source,index,resultTranslation);
        }

        return resultTranslation;
    }


    RuleProcessorService.prototype.runRules = function(source,index,target){

        var that = this;
        var newTarget = '';
        var didChange = false;
        var subSource = source.substring(0,index+1);
        for (var idx =0; idx<that.rules.length; idx++){

            var ruleResult = that.rules[idx].execute(source, index, target);

            if (ruleResult.changed){
                newTarget = ruleResult.transformed;
                didChange = true;
                break;
            }
        }

        if (!didChange){
            newTarget = target + subSource.substring(subSource.length-1);
        }

        return newTarget;
    };

    return RuleProcessorService;
});
