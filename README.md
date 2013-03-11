brando
======

A brand test suite that allows you to test styles within an html page.

It currently logs to the console and can also integrate with QUnit to be
automated with Grunt/PhantomJs.

![](https://lh4.googleusercontent.com/-HK5YXZtMxTQ/UT2aIwkh-OI/AAAAAAAAvaU/UrJUFZrzXZQ/s640/brandolog.png)

## Why?

 - Because I love consistent design
 - Because I don't want to lose the care and attention designers have put in to the finer detail
 - I hate the maintenance headaches of regression.
 - When you get a base set of styles right, it's easier to build modular CSS
 - Design is as important as code, and I want to automate the tests

## Contributions

I welcome any thoughts on how this can be improved. If you have an idea please submit an issue.

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

## Exclusions

There are always exceptions to a rule, and you can include these like so:

    {
        selector: 'p',
        not: [
            '.special',
            '.shout'
        ],
        ...
    ]

## Built in expectations

### CSS Computed Values

Check against an element's computed css value. You can specify multiple properties to check against.

    {
        selector: 'p',
        css: {
            fontSize: '16px',
            color: '#444',
            ...
        }
    }

### Baseline

This checks against the design principle that an element's `line-height` should be a multiplication of the design's baseline.

For example, if the baseline for a design is 8 then:

 - A paragraph with a `font-size` of __14px__ should have a `line-height` of __16px__
 - A heading with a `font-size` of __18px__ should have a `line-height` of __24px__
 - A heading with a `font-size` of __20px__ should also have a `line-height` of __24px__

Here is how you would check this:

    {
        selector: 'p,h1,h2',
        baseline: 8
    }


## Extensible

Brando is fully extensible with the ability to add new properties to expectations.

You simply attach the property name as a function on `Expect.prototype` and this will be matched via the name on properties.

    Expect.prototype.name = function($el, val){
        var failCount = 0,
            actual;
        // -> do checks
        actual = 'foo';
        // run each result through the check function
        failCount += expect.check({
            $el: $el,
            key: 'name',
            expected: val,
            actual: actual
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


