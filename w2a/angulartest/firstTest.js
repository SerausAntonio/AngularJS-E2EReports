describe('Test entering into an input box',function(){

    it ('Executing input',function(){

        browser .get('https://angularjs.org');
        var name = element(by.model('yourName'));
        name.sendKeys("Antonio Seraus");

        var showName = element(by.binding('yourName'));
        showName.getText().then(function(text){
            console.log(text);
        })



    })


})