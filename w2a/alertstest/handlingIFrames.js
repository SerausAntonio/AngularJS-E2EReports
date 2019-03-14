describe("Handling IFrames",function(){

    beforeEach(function(){

        browser.ignoreSynchronization = true;
        browser.get('https://www.w3schools.com/js/tryit.asp?filename=tryjs_myfirst');
    })
    afterEach(function(){

        console.log('Ending testcase......');

    })
    it ('Should be able to switch between frames',function(){

        browser.getTitle().then(function(title){
            console.log(title);
        })

        element.all(by.tagName('iframe')).each(function(frames){

            frames.getAttribute('id').then(function(tekst){
                console.log(tekst);
            })
        })

        browser.switchTo().frame("iframeResult").then(function(){

            element(by.css('body button')).click();
        
            element(by.id('demo')).getText().then(function(tekst){
                console.log(tekst);
            });
        });

    })


})