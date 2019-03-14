exports.config = {

    directConnect: true,
    
    framework: 'jasmine2',
    seleniumAdress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['spec.js']
}