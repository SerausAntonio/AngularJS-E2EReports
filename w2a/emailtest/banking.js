describe("Test Automation of a banking app",function(){

    beforeEach(function(){

        browser.ingnoreSynchronization = true;
        browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");

    })

    afterEach(function(){

        console.log("End Banking test");

    })
    it ("Validate PageTitle",function(){

        browser.getTitle().then(function(title){
            console.log(title);
        })
    });

    it ("Validate customer login test",function(){

        element(by.buttonText('Customer Login')).click();

        element(by.id('userSelect')).click();
        element.all(by.css('#userSelect > option')).then(function(options){
            console.log(options.length);
            options[2].click();
        })
        element(by.buttonText('Login')).click();
    
    })



})