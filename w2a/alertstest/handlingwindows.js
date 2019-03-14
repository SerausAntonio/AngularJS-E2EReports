describe('Handling Windows',function(){

    beforeEach(function(){

        browser.ignoreSynchronization = true;

        browser.get('https://www.hdfcbank.com/');


    })
    afterEach(function(){

        console.log('Ending test......');
    })

    it ('Should be a title on HDFC Bank page!',function(){

        
        expect(browser.getTitle()).toEqual('HDFC Bank: Personal Banking Services');

        browser.getTitle().then(function(title){
            console.log(title);
        })
    })

    it ('Should be able to handle multiple windows on HDFC Bank!',function(){

        element(by.id('loginsubmit')).click();

        browser.getAllWindowHandles().then(function(handles){
                console.log(handles[1]);
                browser.switchTo().window(handles[1]);
                  browser.getTitle().then(function(title){
                    console.log(title);
                });
            
        });
      
    })



})