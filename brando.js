(function($){

    var $brando = $('#brando')
    ;

    var Expect = window.Expect = function(opts){
        this.failures = [];
        this.passes = [];
        this.not = [];
        this.css = {};
        $.extend(this, opts);
    };
    Expect.prototype = {
        selector: ''
    };

    if (!$brando.length){
        $brando = $('<div id="brando" />').appendTo('body');
    }

    var appendInfo = function($el, properties) {
        var $info = $('<span class="brando-info" />').appendTo($el),
            info  = []
        ;
        $(properties).each(function(){
            info.push(this[0] + ': ' + this[1]);
        });
        $info.append(info.join(', '));
    };

    var Brando = window.Brando = function(){};
    Brando.prototype = {
        callback: function(html){
            // $brando.find('>*,li:first-child,img').each(function(){
            //     var $this = $(this);
            //     appendInfo($this, [
            //         ['', this.tagName],
            //         ['font-size', $this.css('font-size')],
            //         ['line-height', $this.css('line-height')]
            //     ]);
            // });
        },
        show: function(){
            $brando.show();
        },
        hide: function(){
            $brando.hide();
        },
        suite: function(url){
            $.getScript(url);
        },
        expect: function(expects){
            var self = this;
            console.log('Brando Started');
            expects.failures = [];
            $(expects).each(function(){
                var expect = new Expect(this),
                    failCount = 0
                ;
                expect.actual = {};
                $(expect.selector)
                .not(expect.not.join())
                .each(function(){
                    var $this = $(this),
                        failure;
                    for (var key in expect.css){
                        if (expect.css.hasOwnProperty(key)){
                        expect.actual[key] = $this.css(key);
                            if (expect.actual[key] !== expect.css[key]){
                                failure = {
                                    $el: $this,
                                    css: key,
                                    expected: expect.css[key],
                                    actual: expect.actual[key]
                                };
                                expect.failures.push(failure);
                                expects.failures.push(failure);
                                console.error([expect.selector, $this[0], failure, expect]);
                                failCount++;
                            } else {
                                expect.passes.push({
                                    $el: $this,
                                    css: key,
                                    expected: expect.css[key],
                                    actual: expect.actual[key]
                                });
                            }
                        }
                    }
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