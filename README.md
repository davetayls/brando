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
        }
    ]);
