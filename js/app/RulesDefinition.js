/**
 * Created by jaimevalencia on 9/19/15.
 */

define(['Rule'], function(Rule){

    //TODO How to define a static class
    var RulesDefinition = function(){
        RulesDefinition.rules = [];

        // ORDER of rules matters
        RulesDefinition.rules.push(new Rule(/R/, 1, true, "RR"));
        RulesDefinition.rules.push(new Rule(/r/,1,true,"rh",
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
        RulesDefinition.rules.push(new Rule(/a|A/,1,true,"hra"));
        RulesDefinition.rules.push(new Rule(/[\.|\!|\?]+\s{1}[a-zA-Z]/,3,false,function(val){return val.toUpperCase();}));
        RulesDefinition.rules.push(new Rule(/e|E/,1,true,"rr"));
        RulesDefinition.rules.push(new Rule(/i|I/,1,true,"rrRr"));
        RulesDefinition.rules.push(new Rule(/o|O/,1,true,"rrrRr"));
        RulesDefinition.rules.push(new Rule(/u|U/,1,true,"rrrrRr"));

        // New rules
        RulesDefinition.rules.push(new Rule(/x|X/,1,true,"GRrr"));
        RulesDefinition.rules.push(new Rule(/w|W/,1,true,"Pappa"));
        RulesDefinition.rules.push(new Rule(/c|C/,1,true,"Mem"));
    };

    /**
     * Static method that returns rules definitions
     * @returns {CssRule[]|string|Array|RuleProcessorService.rules|*}
     */
    RulesDefinition.getRuleCollection = function(){
        return RulesDefinition.rules;
    }

    return RulesDefinition;
});
