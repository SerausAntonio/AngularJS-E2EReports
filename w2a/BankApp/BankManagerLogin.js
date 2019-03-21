describe("Login to the  Bank Manager Account",function(){


    it ('Login to the  Bank Manager Account',function(){

        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');

        element(by.css('button.btn[ng-click="manager()"]')).click();
        browser.sleep(2000);
    });

    it('Validate Add Customer',function(){
        var EC = protractor.ExpectedConditions;
        var addCustBtn = element(by.css('button.btn[ng-class="btnClass1"]')); 
        browser.wait(EC.elementToBeClickable(addCustBtn),1000);
        addCustBtn.click();

        browser.sleep(1000);
        element(by.model('fName')).sendKeys('Antonio');
        element(by.model('lName')).sendKeys('Seraus');
        element(by.model('postCd')).sendKeys('1102BA');
        element(by.css('button.btn[type="submit"]')).click();

        browser.wait(protractor.ExpectedConditions.alertIsPresent(),1000);
        var alertDialog = browser.switchTo().alert();
        alertDialog.getText().then(function(tekst){
            console.log(tekst);
        });
        alertDialog.accept();        
      //  browser.sleep(2000);
    })

        it ('Validate Open Account',function(){
            browser.sleep(1000);
            element(by.buttonText('Open Account')).click();

            var userSelected = element(by.id('userSelect')); 
            browser.wait(protractor.ExpectedConditions.elementToBeClickable(userSelected,1000));
            userSelected.click();

            element.all(by.css('#userSelect > option')).then(function(names){
                console.log(names.length);
                for (let i=0; i < names.length; i++){
                     names[i].getText().then(function(tekst){
                        console.log(tekst);
                    });
                }

            })

         //   element(by.id('currency')).click();

        })

        xit ('Validate the precence of a Customer',function(){
           element(by.css('button.btn[ng-class="btnClass3"]')).click();

            element(by.model('searchCustomer')).sendKeys("Antonio");

        })
        xit ('Validate deleting a Customer',function(){



        })


})