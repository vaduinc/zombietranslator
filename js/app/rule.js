/**
 * Created by jaimevalencia on 9/17/15.
 */

define(['RuleResult'], function(RuleResult){

    var Rule = function(patt,pattLen,isRegexp,replace){

        this.pattern = patt;
        this.patternLength = pattLen;
        this.isRegexp = isRegexp;
        this.replacement = replace;
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
            }else{
                executionResult.appended = sectionToCheck.replace(patternToMatch,that.replacement(sectionToCheck));
            }

            executionResult.transformed = target.substring(0,(target.length - (this.patternLength-1))) + executionResult.appended;

        }

        return executionResult;
    };

    return Rule;
});