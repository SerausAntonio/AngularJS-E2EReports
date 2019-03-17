describe("Test Gmail", function(){

    beforeEach(function(){
        browser.ignoreSynchronization = true;
        browser.get(Objects.testsiteurl);
        console.log("Test site URL is : " + Objects.testsiteurl);
        browser.sleep(6000);
    });

    
    it ("Validate user credentials",function(){

        element(by.xpath(Objects.locators.loginPage.username)).sendKeys(Objects.userdetails.username1);
        
        element(by.css(Objects.locators.loginPage.volgende)).click();
        browser.sleep(5000);
    })

  })



})