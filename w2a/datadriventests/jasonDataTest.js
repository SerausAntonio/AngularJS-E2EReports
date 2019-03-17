var Objects = require('./Objects.json');
var using = require('jasmine-data-provider');

describe("Test Gmail", function(){

    beforeEach(function(){
        browser.ignoreSynchronization = true;
        browser.get(Objects.testsiteurl);
        console.log("Test site URL is : " + Objects.testsiteurl);
        browser.sleep(6000);
    });

    using([{username:Objects.userdetails.username1,password:Objects.userdetails.password1},{username:Objects.userdetails.username2,password:Objects.userdetails.password2}],function(data){
    
    it ("Validate user credentials",function(){
        element(by.xpath(Objects.locators.loginPage.username)).sendKeys(data.username);
        console.log(data.password);
        element(by.css(Objects.locators.loginPage.volgende)).click();
        browser.sleep(5000);
    })

  })



})