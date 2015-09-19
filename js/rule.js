/**
 * Created by jaimevalencia on 9/17/15.
 */


    var RuleResult = function(){
        this.changed = false;
        this.appended= '';
        this.transformed ='';
        this.needPosChecking = false;
    };

    var RuleProcessorService = function(){
        this.rules = [];

        this.rules.push(new Rule(/r\s/,2,true,"rh ",false));
        this.rules.push(new Rule(/a|A/,1,true,"hra",false));
        this.rules.push(new Rule(/[\.|\!|\?]+\s{1}[a-zA-Z]/,3,false,function(val){return val.substring(val.length-1).toUpperCase();},false));
        this.rules.push(new Rule(/e|E/,1,true,"rr",false));
        this.rules.push(new Rule(/i|I/,1,true,"rrRr",false));
        this.rules.push(new Rule(/o|O/,1,true,"rrrRr",false));
        this.rules.push(new Rule(/u|U/,1,true,"rrrrRr",false));
        this.rules.push(new Rule(/r|R/,1,true,"RR",false));
    };

    RuleProcessorService.prototype.runRules = function(source,target){

        var that = this;
        var newTarget = '';
        var didChange = false;
        for (var idx =0; idx<that.rules.length; idx++){

            var ruleResult = that.rules[idx].execute(source, target);

            if (ruleResult.changed){
                newTarget = ruleResult.transformed;
                didChange = true;
                // TODO check here for ruleResult.needPosChecking
                break;
            }
        }

        if (!didChange){
            newTarget = target + source.substring(source.length-1);
        }

        return newTarget;
    };

    var Rule = function(patt,pattLen,isRegexp,replace,isPostCheck){

        this.pattern = patt;
        this.patternLength = pattLen;
        this.isRegexp = isRegexp;
        this.replacement = replace;
        this.postChecking = isPostCheck;
    };

    Rule.prototype.execute = function(source, target){

        var that = this;
        var executionResult = new RuleResult();
        executionResult.transformed = '';

        var sectionToCheck = source.slice((-1)*that.patternLength); // get the last * characters based on the pattern
        var patternToMatch = new RegExp(that.pattern);
        var pos = sectionToCheck.search(patternToMatch);

        if (pos != -1) {
            executionResult.changed=true;
            if (that.isRegexp){
                executionResult.appended = sectionToCheck.replace(patternToMatch,that.replacement);
                //executionResult.transformed = target + executionResult.appended;
            }else{
                executionResult.appended = sectionToCheck.replace(patternToMatch,that.replacement(sectionToCheck));
                //executionResult.transformed = target.replace(sectionToCheck,executionResult.appended);
            }

            executionResult.transformed = target + executionResult.appended;

        }

        return executionResult;
    };

