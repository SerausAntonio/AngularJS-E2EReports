/** Created by Antonio Seraus on 20-03-2019 */

describe('Automating Customer Login functionality',function(){

    
    it ('Validate Login functionality',function(){
        browser.ignoreSynchronization= true;
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');

        var EC = protractor.ExpectedConditions;
        var loginButton = element(by.buttonText('Customer Login'));
        //var isClickable = EC.elementToBeClickable(loginButton);

        browser.wait(EC.elementToBeClickable(loginButton),1000);
        loginButton.click();
        
        var selectUser =  element(by.id('userSelect'));
        browser.wait(EC.elementToBeClickable(selectUser),1000);
        selectUser.click();

        element(by.css('#userSelect > option:nth-child(3)')).click();
        
        element(by.buttonText('Login')).click();
    
    })

    it ('validate deposit functionality', function(){
        var EC = protractor.ExpectedConditions;
        let depositBtn = element(by.buttonText('Deposit'));
        browser.wait(EC.elementToBeClickable(depositBtn),1000);
        depositBtn.click();
        browser.sleep(1000);
        element(by.model('amount')).sendKeys('1000');

        browser.sleep(1000);
        //element(by.buttonText('Deposit')).click();
        element(by.css('button.btn[type="submit"]')).click();
        browser.sleep(1000);
        expect(element(by.css('span.error[ng-show="message"]')).getText()).toEqual('Deposit Successful');
    })

    it ('Validate overdraw',function(){
        element(by.css('button.btn[ng-class="btnClass3"]')).click();
        browser.sleep(5000);
        element(by.model('amount')).sendKeys('2000');
        element(by.css('button.btn[type="submit"]')).click();

        expect(element(by.css('span.error[ng-show="message"]')).getText()).toEqual('Transaction Failed. You can not withdraw amount more than the balance.');
    })

})