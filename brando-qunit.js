/**
 * QUnit plugin for Brando
 */
;(function($){

    var errCount = 0,
        cssClassBase = 'brando-qunit-fail',
        styles = '<style> .brando-qunit-fail {outline: dashed 2px red; } </style>'
    ;

    window.Brando.prototype.qunit = function(){
        $('head').append(styles);
        this.bind('result', function(ev, message, expect){
            QUnit.test(message, function(){
                var i, f, p, cssClass;
                for (i = 0; i < expect.failures.length; i++) {
                    f = expect.failures[i];
                    cssClass = cssClassBase +'-'+ (errCount++);
                    equal(f.actual, f.expected, expect.selector +': '+ f.key +' - $(".'+ cssClass +'")');
                    f.$el
                        .addClass(cssClassBase)
                        .addClass(cssClass);
                }
                for (i = 0; i < expect.passes.length; i++) {
                    p = expect.passes[i];
                    equal(p.actual, p.expected, expect.selector +': '+ p.key +' -> '+ p.expected);
                }
            });
        });
        return this;
    };

})(jQuery);