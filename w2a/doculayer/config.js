var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {

    directConnect: true,
    
    framework: 'jasmine2',
    seleniumAdress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['spec.js'],

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'tmp/screenshots'
        }).getJasmine2Reporter());
     }
  }




