describe('Handling Tabs and Popups',function(){

  it ('Handling Tabs and Popups',function(){

    browser.ignoreSynchronization = true;
    browser.get('http://www.hdfcbank.com/');
    browser.manage().window().maximize();

    element (by.id('loginsubmit')).click();
    browser.sleep(2000);

    browser.driver.getAllWindowHandles().then(function(handles) {
        console.log(handles.length);
        browser.driver.switchTo().window(handles[1]);
    })
    expect(element(by.xpath('//div[@class="impMsgs"]/preceding-sibling::div/a')).isDisplayed()).toBe(true);
    browser.sleep(5000);
    browser.executeScript('window.scrollTo(0,10000);').then(function () {
        console.log('++++++SCROLLED Down+++++');
    });
 //   element(by.linkText('Apply Now')).click();
    browser.sleep(5000);
  })
})
 





