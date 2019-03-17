describe('Test Automation of a banking app',function(){
    beforeEach(function(){

        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
    
    })

    afterEach(function(){


    })

    it ('Should have a title',function(){

           browser.getTitle().then(function(tekst){
           // console.log(tekst);
            expect(tekst).toEqual('Protractor practice website - Banking App');
        })
    })

    it('Should be able to login as a costumer',function(){
        var custLogin = element(by.css('button[ng-click="customer()"]'));
        custLogin.click();

        var selectName = element(by.id('userSelect'));

        selectName.click();
        element.all(by.css('#userSelect option')).then(function(items){
                   
        //     console.log(items.length);
        //     expect(items.length).toBe(6);
        //     expect(items[2].getText()).toBe('Harry Potter');
        //     items[2].click();
            
     //    });
       
     var selectedName = element(by.css('option[value="2"]'));
        selectedName.click();


        selectedName.getText().then(function(tekst){
            console.log(tekst);
        });
        
        expect(selectedName.getText()).toEqual("Harry Potter");
        var loginButton = element(by.buttonText('Login'));
        loginButton.click();
        browser.sleep(8000);



    })

})   
