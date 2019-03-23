let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

directConnect: true;
ignoreSynchronization = true,
//browser.driver.manage().timeouts().implicitlyWait(10000);

exports.config = {
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 360000,
    print: function () {
    }
  },
  
  specs: [
    './TabsAndPopUps.js'
  ],
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: ['--test-type']
    }
  },
  logLevel: 'WARN',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }));
  }
};