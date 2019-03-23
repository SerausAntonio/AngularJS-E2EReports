var base = require('./BasePage.js');
describe('BankManager Login Test',function(){

    var home_page = require('../pageobjects/HomePage.js');
    it ('Login as Bank Manager',function(){
        base.navigateToUrl('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        var title = base.getPageTitle();
        console.log(title);
        home_page.loginAsBankManager();
        browser.sleep(5000);
    })



})