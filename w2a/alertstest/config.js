
exports.config = {
    framework: 'jasmine2',

    seleniumAddress: 'http://127.0.0.1:51230',
    //http://localhost:4444/wd/hub',

    directConnect:true,

    capabilities: {
        browserName: 'chrome',

    },
    specs: ['handlingwindows.js', 'handlingIFrames.js','handlingAlerts.js','hackermoon.js'],

    jasmineNodeOpts: {
        showColors: true,
        silent: true,
        defaultTimeoutInterval: 360000,
        print: function () {
        }
  },
  onPrepare: function () {
  
     browser.ingnoreSynchronization=true;
     browser.driver.manage().window().maximize();
  
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
  

}
