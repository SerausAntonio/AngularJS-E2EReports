var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {

    directConnect: true,
    
    framework: 'jasmine2',
    seleniumAdress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['banking.js'],

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'tmp/screenshots'
        }).getJasmine2Reporter());
     },

     onComplete:function(){
         console.log("Sending Mail with reports for the test execution.");
         var sys = require('util')
         var exec = require('child_process').exec;
         function puts(error, stdout, stderr) {sys.puts(stdout)}
         exec("node mail.js", puts);
     },

  }




