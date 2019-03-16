let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

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
  
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
  

}
