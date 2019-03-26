exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  capabilities: {
    'browserName': 'chrome',
    'platformName': 'android',
    'deviceName': 'Samsung J7'
  
  },
  specs: ['../cwztests/cwztest.js']
};
