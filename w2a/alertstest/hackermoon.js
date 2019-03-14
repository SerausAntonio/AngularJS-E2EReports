describe('Hackermoon testing list',function(){
    beforeEach(function(){

        browser.ignoreSynchronization = true;
        browser.get('https://hackernoon.com/cypress-io-vs-protractor-e2e-testing-battle-d124ece91dc7');
    })
    
    afterEach(function(){

        console.log("Ending......");
    })

    it ('Should be able to test list elements',function(){

        browser.getTitle().then(function(tekst){

            console.log(tekst);
        })

        element.all(by.css('ul.js-collectionNavItems > li')).then(function(count){


            console.log(count.length);
            for (i=0; i < count.length; i++){
                count[i].getText().then(function(tekst){
                    console.log(tekst);
                })
            }
        })

        let el = element(by.buttonText('Show all responses'));
       
        browser.executeScript(function() {arguments[0].scrollIntoView();},
        el.getWebElement());
        
        el.click();

        browser.sleep(6000);
    })

})