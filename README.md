brando
======

A brand test suite that allows you to test styles within an html page.

It currently logs to the console and can also integrate with QUnit to be
automated with Grunt/PhantomJs.

## Usage

### Include Scripts

    <link rel="stylesheet" href="qunit.css">
    ...
    <script src="jquery.js"></script>
    <script src="qunit.js"></script>
    <script src="brando.js"></script>
    <script src="brando-qunit.js"></script>

### Add html to body

    <h1>Header 1</h1>
    <p>paragraph text</p>

### Run a suite of expectations

    var b = new Brando();
    b.qunit(); // optional
    b.expect([
        {
            selector: 'h1',
            css: {
                fontSize: '39px',
                lineHeight: 'normal'
            }
        },
        {
            selector: 'p',
            css: {
                fontSize: '16px'
            },
            baseline: 8
        },
        {
            selector: 'h1,h2,h3,h4,h5,h6,p,ul,ol,li,dl,dt,dd,blockquote',
            baseline: 8
        }
        
    ]);

## Extensible

Brando is fully extensible with the ability to add new properties to expectations.

You simply attach the property name as a function on `Expect.prototype` and this will be matched via the name on properties.

    Expect.prototype.name = function($el, val){
        var failCount = 0;
        // run each result through the check function
        failCount += expect.check({
            $el: $el,
            key: key,
            expected: val[key],
            actual: val.actual[key]
        });
        
        // the function must return the fail count
        return failCount;
    }

You can then use this within the expect call

    b.expect([
        {
            selector: 'h1',
            name: value // passed to val
        }
    ]);


