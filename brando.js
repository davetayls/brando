(function($){

var $brando = $('#brando'),
    maxIndividualExpectFail = 8
;

var Expect = function(opts){
    $.extend(this, opts);
    this.failures = [];
};
Expect.prototype = {
    selector: '',
    not: [],
    css: {}
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

window.brando = {
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
        jQuery.getScript(url);
    },
    expect: function(expects){
        console.log('Begin brand tests');
        expects.failures = [];
        $(expects).each(function(i){
            var expect = new Expect(this),
                failCount = 0;
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
                        }
                    }
                }
            });
            if (!failCount){
                console.log([' ✔  ' + expect.selector, expect]);
            } else {
                console.error([' ✘  [' + failCount + '] ' + expect.selector, expect]);
            }
        });
        if (expects.failures.length){
            console.error(' ✘  Brand test failures: ' + expects.failures.length + ' from ' + expects.length + ' expectation specs');
        } else {
            console.log(' ✔  ' + expects.length + ' expectations, NO FAILURES, FLIP COOL ☼');
        }
    }
};

$.getScript('https://raw.github.com/gist/06fe84970308bf1ba603/brando-html.js');

}(jQuery));