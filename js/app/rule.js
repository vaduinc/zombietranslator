/**
 * Created by jaimevalencia on 9/17/15.
 */

define(['RuleResult'], function(RuleResult){

    var Rule = function(patt,pattLen,isRegexp,replace,conflicts){

        this.pattern = patt;
        this.patternLength = pattLen;
        this.isRegexp = isRegexp;
        this.replacement = replace;
        this.conflicts = conflicts;
    };

    Rule.prototype.execute = function(source, index, target){

        var that = this;
        var executionResult = new RuleResult();
        executionResult.transformed = '';

        var sectionToCheck = source.substring(0,index+1).slice((-1)*that.patternLength); // get the last Y characters based on the pattern

        if (that.conflicts){
            that.conflicts(source.length,index+1,that);
        }

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