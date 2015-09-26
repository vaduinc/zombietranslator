/**
 * Created by jaimevalencia on 9/19/15.
 */
define(['Rule', 'RuleResult'], function(Rule,RuleResult){

    var RuleProcessorService = function(){
        this.rules = [];

        // ORDER of rules matters
        this.rules.push(new Rule(/R/, 1, true, "RR"));
        this.rules.push(new Rule(/r/,1,true,"rh",
            function (len,idx,rule){
                if (len==idx){
                    rule.pattern=/r\b/;
                    rule.replacement = "rh";
                }else{
                    rule.pattern=/r/;
                    rule.replacement = "RR";
                }
            }
        ));
        this.rules.push(new Rule(/a|A/,1,true,"hra"));
        this.rules.push(new Rule(/[\.|\!|\?]+\s{1}[a-zA-Z]/,3,false,function(val){return val.toUpperCase();}));
        this.rules.push(new Rule(/e|E/,1,true,"rr"));
        this.rules.push(new Rule(/i|I/,1,true,"rrRr"));
        this.rules.push(new Rule(/o|O/,1,true,"rrrRr"));
        this.rules.push(new Rule(/u|U/,1,true,"rrrrRr"));

    };

    RuleProcessorService.prototype.translate = function(source){

        var that = this;
        var resultTranslation ='';
        for (var index = 0 ; index < source.length ; index++){
            resultTranslation = that.runRules(source,index,resultTranslation);
        }

        return resultTranslation;
    }


    // TODO leave this one as private
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
