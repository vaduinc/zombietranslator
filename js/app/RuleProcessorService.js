/**
 * Created by jaimevalencia on 9/19/15.
 */
define(['Rule', 'RuleResult'], function(Rule,RuleResult){

    var RuleProcessorService = function(){
        this.rules = [];

        // ORDER of rules matters
        this.rules.push(new Rule(/(r|R)/,
            1,
            true,
            "RR",
            function(source, index, len){
                if (source.length==index+1){
                    return source.substring(0,index+1).slice((-1)*1);
                }else{
                    return source.substring(0,index+2).slice((-1)*2);
                }
            },
            [new Rule(/r\b/,1,true,"rh",
                function(source, index, len){
                    if (source.length==index+1){
                        return source.substring(0,index+1).slice((-1)*1);
                    }else{
                        return source.substring(0,index+2).slice((-1)*2);
                    }
                })
            ]));

        //this.rules.push(new Rule(/r\s/,2,true,"rh "));
        //this.rules.push(new Rule(/r\b/,2,true,"rh"));
        //this.rules.push(new Rule(/(r|R)[^\s]/,2,false,function(val){return 'RR' +  this.runRules(val.substring(val.length-1),'');}));
        this.rules.push(new Rule(/a|A/,1,true,"hra",function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));
        this.rules.push(new Rule(/[\.|\!|\?]+\s{1}[a-zA-Z]/,3,false,function(val){return val.toUpperCase();},function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));
        this.rules.push(new Rule(/e|E/,1,true,"rr",function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));
        this.rules.push(new Rule(/i|I/,1,true,"rrRr",function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));
        this.rules.push(new Rule(/o|O/,1,true,"rrrRr",function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));
        this.rules.push(new Rule(/u|U/,1,true,"rrrrRr",function(val1, val2, val3){return val1.substring(0,val2+1).slice((-1)*val3);}));

    };

    RuleProcessorService.prototype.translate = function(source){

        var that = this;
        var resultTranslation ='';
        for (var index = 0 ; index < source.length ; index++){
            //resultTranslation = that.runRules(source.substring(0,index+1),resultTranslation);
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
