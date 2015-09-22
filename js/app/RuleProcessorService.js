/**
 * Created by jaimevalencia on 9/19/15.
 */
define(['Rule', 'RuleResult'], function(Rule,RuleResult){

    var RuleProcessorService = function(){
        this.rules = [];

        this.rules.push(new Rule(/r\s/,2,true,"rh "));
        this.rules.push(new Rule(/a|A/,1,true,"hra"));
        this.rules.push(new Rule(/[\.|\!|\?]+\s{1}[a-zA-Z]/,3,false,function(val){return val.toUpperCase();}));
        this.rules.push(new Rule(/e|E/,1,true,"rr"));
        this.rules.push(new Rule(/i|I/,1,true,"rrRr"));
        this.rules.push(new Rule(/o|O/,1,true,"rrrRr"));
        this.rules.push(new Rule(/u|U/,1,true,"rrrrRr"));
        this.rules.push(new Rule(/(r|R)[^\s]/,2,true,"RR"));
    };

    RuleProcessorService.prototype.translate = function(source){

        var that = this;
        var resultTranslation ='';
        for (var index = 0 ; index < source.length ; index++){
            resultTranslation = that.runRules(source.substring(0,index+1),resultTranslation);
        }

        return resultTranslation;
    }


    // TODO leave this one as private
    RuleProcessorService.prototype.runRules = function(source,target){

        var that = this;
        var newTarget = '';
        var didChange = false;
        for (var idx =0; idx<that.rules.length; idx++){

            var ruleResult = that.rules[idx].execute(source, target);

            if (ruleResult.changed){
                newTarget = ruleResult.transformed;
                didChange = true;
                break;
            }
        }

        if (!didChange){
            newTarget = target + source.substring(source.length-1);
        }

        return newTarget;
    };

    return RuleProcessorService;
});
