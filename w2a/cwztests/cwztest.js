describe("CWZ tests",function(){
    beforeEach(function(){
        browser.ignoreSynchronization= true;
        browser.manage().deleteAllCookies();
        browser.get("https://www.cwz.nl");
       

    })

    afterEach(function(){

        console.log('Loging out');
    })
    
    xit ("Assert Element to be present",function(title){
        //var EC = protractor.ExpectedConditions

        // browser.getTitle().then(function(title){
        //     console.log(title);
        // })

        //expect(browser.getTitle()).toEqual("Home | CWZ Nijmegen");
        var EC = protractor.ExpectedConditions;
        var welcome_message=element(by.css('.title'));
        var isVisable = EC.visibilityOf(welcome_message);
        browser.wait(isVisable, 1000);

        expect(element(by.css('.title')).isDisplayed()).toBe(true);
        
    });

    it ("Assert actions",function(){

        element.all(by.css('.directly-to > ul > li')).then(function(items){
            console.log(items.length);
            for(let i=0; i < items.length; i++){
                items[i].getText().then(function(item){
                    console.log(item);
                });
            }
        })

    })

    it ("Assert Menu's",function(){

        element.all(by.css('#navigation > ul > li')).then(function(menu_items){
            console.log(menu_items.length);
            for(let i=0; i < menu_items.length; i++){
                menu_items[i].getText().then(function(item){
                    console.log(item);
                });
            }
        })
    })

    it ("Assert Menu MouseOver",function(){

        element.all(by.css('#navigation > ul > li')).then(function(menu_items){
            console.log(menu_items.length);
        
            for(let i=0; i<menu_items.length; i++){
                browser.actions().mouseMove(menu_items[i]).perform();
              //  browser.sleep(6000);
            }
        });
        
    })
    it ("Assert MijnCWZ",function(){

        element(by.css('.my-cwz > a')).click();
        expect(element(by.id('c16228')).getText()).toEqual('MijnCWZ');

    })


})