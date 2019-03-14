describe("Handling Alerts",function(){
    beforeEach(function(){

        browser.ignoreSynchronization = true;
        browser.get('https://mail.rediff.com/cgi-bin/login.cgi');
    })
    afterEach(function(){
        console.log('Ending........');
    })

    it ('Should be able to handle alerts',function(){

        browser.getTitle().then(function(title){
            console.log(title);
        })

        element(by.css('input[value="Go"]')).click();

        var EC = protractor.ExpectedConditions;
        // Waits for an alert pops up.
        browser.wait(EC.alertIsPresent(), 5000);
        let alert = browser.switchTo().alert();
        browser.sleep(5000);
        expect(alert.getText()).toEqual('Please enter a valid user name');

        alert.getText().then(function(tekst){
            console.log(tekst);
            
        })  
        alert.accept();

        browser.sleep(5000);
    })



})