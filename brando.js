(function($){

    var Expect = window.Expect = function(suite, opts){
        this.failures = [];
        this.passes = [];
        this.not = [];
        this.properties = {};
        this.suite = suite;

        this.selector = opts.selector;
        delete opts.selector;
        $.extend(this.properties, opts);
    };
    Expect.prototype = {
        selector: '',
        iterateProperties: function($el){
            var self = this,
                failCount = 0
            ;
            for (var key in self.properties){
                if (self.properties.hasOwnProperty(key)){
                    if ($.isFunction(self[key])){
                        failCount += self[key]($el, self.properties[key]);
                    }
                }
            }
            return failCount;
        },
        check: function(result){
            if (result.actual !== result.expected){
                this.fail(result);
                return 1;
            } else {
                this.pass(result);
                return 0;
            }
        },
        pass: function(result){
            this.passes.push(result);
        },
        fail: function(result){
            this.failures.push(result);
            this.suite.failures.push(result);
            console.error([this.selector, result.$el[0], result, this]);
        },
        baseline: function($el, val){
            var expect = this,
                failCount = 0,
                actual,

                lineHeight = $el.css('lineHeight'),
                lineHeightVal = parseInt(lineHeight, 10)
            ;
            // create actual values holder
            if (lineHeightVal === 0){
                actual = lineHeight;
            } else {
                actual = lineHeightVal % val === 0 ? val : lineHeight;
            }
            failCount += expect.check({
                $el: $el,
                key: 'baseline',
                expected: val,
                actual: actual
            });

            return ;
        },
        css: function($el, val){
            var expect = this,
                failCount = 0
            ;
            // create actual values holder
            val.actual = $;

            // check each css property
            for (var key in val){
                if (val.hasOwnProperty(key) && key !== 'actual'){
                    // calculate values
                    val.actual[key] = $el.css(key);
                    failCount += expect.check({
                        $el: $el,
                        key: key,
                        expected: val[key],
                        actual: val.actual[key]
                    });
                }
            }
            return failCount;
        }
    };

    var Brando = window.Brando = function(){};
    Brando.prototype = {
        expect: function(expects){
            var self = this;
            console.log('Brando Started');
            expects.failures = [];
            $(expects).each(function(){
                var expect = new Expect(expects, this),
                    failCount = 0
                ;
                $(expect.selector)
                    .not(expect.not.join())
                    .each(function(){
                        var $this = $(this);
                        failCount += expect.iterateProperties($this);
                    });
                self.logExpect(expect, failCount);
            });
            self.logSuiteResults(expects);
        },
        logExpect: function(expect, failCount){
            var message = '';
            if (!failCount){
                message = ' ✔  ' + expect.selector;
                console.log([message, expect]);
            } else {
                message = ' ✘  [' + failCount + '] ' + expect.selector;
                console.error([message, expect]);
            }
            this.trigger('result', [message, expect, failCount]);
        },
        logSuiteResults: function(expects){
            var message = '',
                pass = expects.failures.length === 0
            ;
            if (expects.failures.length){
                message = ' ✘  Brand test failures: ' + expects.failures.length + ' from ' + expects.length + ' expectation specs';
                console.error(message);
            } else {
                message = ' ✔  ' + expects.length + ' expectations, NO FAILURES, FLIP COOL ☼';
                console.log(message);
            }
            this.trigger('results', [pass, message, expects]);
        },

        // eventing
        bind: function(){
            var $this = $(this);
            $this.bind.apply($this, arguments);
        },
        trigger: function(){
            var $this = $(this);
            $this.trigger.apply($this, arguments);
        }
    };


}(jQuery));