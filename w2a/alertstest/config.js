exports.config = {
    framework: 'jasmine2',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    directConnect:true,

    capabilities: {
        browserName: 'chrome',

    },
    specs: ['handlingwindows.js', 'handlingIFrames.js','handlingAlerts.js','hackermoon.js'],

    jasmineNodeOpts: {
        showColors: true
    }
}