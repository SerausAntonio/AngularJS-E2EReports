describe('Doculayer website',function(){

    beforeEach(function(){

        browser.ignoreSynchronization = true;
        browser.get("https://www.doculayer.com");
        browser.driver.manage().window().maximize();
    })

    afterEach(function(){



    })
    it ('should return a pagetitle',function(){

        
        expect(browser.getTitle()).toBe("Doculayer - Cognitive Content Management");

    });
    it ('should show dropdown menu',function(){

        var menuItem =  element(by.xpath("//a[text() = 'Solutions ']"));
        var menuList= element(by.css('li.hs-menu-item'));
        browser.actions().mouseMove(menuItem).perform();
        expect(menuList.isDisplayed()).toBeTruthy();
        
    })



})