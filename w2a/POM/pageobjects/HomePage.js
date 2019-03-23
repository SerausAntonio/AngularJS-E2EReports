var HomePage = function(){

    this.loginAsCustomer = function(){

       element(by.css('button.btn[ng-click="customer()"]')).click();

    }
    this.loginAsBankManager = function(){

        element(by.css('button.btn[ng-click="manager()"]')).click();
    }


}

module.exports = new HomePage();