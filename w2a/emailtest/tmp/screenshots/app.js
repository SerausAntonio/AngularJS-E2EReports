var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "Should be able to get PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13648,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e2004a-00d0-00a6-00ff-00cb00a00069.png",
        "timestamp": 1552762379337,
        "duration": 2723
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13648,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d100ac-006d-00a0-00df-00a1003f005e.png",
        "timestamp": 1552762382849,
        "duration": 1583
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3208,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039005f-00a6-003f-00bf-009500f500a6.png",
        "timestamp": 1552762538126,
        "duration": 2117
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3208,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0085009e-00ad-0099-0077-00fa001e00eb.png",
        "timestamp": 1552762541014,
        "duration": 1453
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13976,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005f0085-005b-005c-0001-00ce00800041.png",
        "timestamp": 1552762932476,
        "duration": 1926
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13976,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": [
            "Failed: element(...).then is not a function"
        ],
        "trace": [
            "TypeError: element(...).then is not a function\n    at UserContext.<anonymous> (D:\\Users\\Antonio Seraus\\angularjs\\w2a\\emailtest\\banking.js:27:50)\n    at D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Validate customer login test\") in control flow\n    at UserContext.<anonymous> (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (D:\\Users\\Antonio Seraus\\angularjs\\w2a\\emailtest\\banking.js:22:5)\n    at addSpecsToSuite (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (D:\\Users\\Antonio Seraus\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (D:\\Users\\Antonio Seraus\\angularjs\\w2a\\emailtest\\banking.js:1:63)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00810066-0069-00ce-00e2-008e00ab0094.png",
        "timestamp": 1552762935240,
        "duration": 1532
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13860,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001b005d-00a8-0014-0088-00080036002d.png",
        "timestamp": 1552762995644,
        "duration": 2166
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13860,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000e00a7-0079-007f-0039-002300730065.png",
        "timestamp": 1552762998623,
        "duration": 1757
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14080,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001c00a6-0012-00cf-00b5-00ee00050085.png",
        "timestamp": 1552763076876,
        "duration": 2407
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14080,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0089005a-001b-008f-0063-004a0074002b.png",
        "timestamp": 1552763080073,
        "duration": 1763
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4444,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005100eb-0094-00dc-00a2-0060004e00f5.png",
        "timestamp": 1552763659141,
        "duration": 2222
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4444,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e300ce-00f5-0011-00ca-00cf004b0035.png",
        "timestamp": 1552763662226,
        "duration": 1976
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13436,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00430063-0018-0012-000f-003100cf0050.png",
        "timestamp": 1552763745942,
        "duration": 2194
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13436,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001c0061-007f-0055-0072-00f0000e0061.png",
        "timestamp": 1552763748908,
        "duration": 1649
    },
    {
        "description": "Validate PageTitle|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1056,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004e007d-0076-005f-00bb-001e00d800cd.png",
        "timestamp": 1552766262814,
        "duration": 2245
    },
    {
        "description": "Validate customer login test|Test Automation of a banking app",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1056,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0055009a-0049-00f6-0097-002600c1007a.png",
        "timestamp": 1552766266157,
        "duration": 1974
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else
                    {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

