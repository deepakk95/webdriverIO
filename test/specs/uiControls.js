const expectchai = require('chai').expect

describe('Ui Controls',()=>{
    it('Radio Button',()=>{
        browser.url("http://dyn-web.com/tutorials/forms/examples/pizza.php")
        // To fetch both the radio buttons we make use of 2 $ symbol
        const radiobuttons = $$("input[name='size']") // It returns Array ( multiple matching elements )
        const largeRdoBtn = radiobuttons[2]
        largeRdoBtn.click() 
        browser.pause(3000)
        // isSelected() returns true / false based upon element or radio button is currently selected
        console.log(largeRdoBtn.isSelected()) // true
        expect(largeRdoBtn).toBeSelected()
        const smlRdoButton = radiobuttons[0]
        smlRdoButton.click()
        console.log(largeRdoBtn.isSelected()) // false
        expect(largeRdoBtn).not.toBeSelected() // not is used to negate the condition
    })

    it('Pop-up Modal',()=>{
        browser.url("https://www.seleniumeasy.com/test/bootstrap-modal-demo.html")
        const btn = $("a[href='#myModal0']")
        btn.click()
        const save = $("=Save changes")
        save.waitForDisplayed()
        save.waitForExist()
        save.click()
        browser.pause(3000)
        
    })

    it('Static Dropdown',()=>{
        browser.url("https://www.seleniumeasy.com/test/basic-select-dropdown-demo.html")
        const dropdown = $("#select-demo")
        browser.pause(3000)
        // There are 3 ways to select dropdown.
        // Multiple pause are being added so that changes being made are visible.
        dropdown.selectByAttribute('value','Tuesday')
        browser.pause(2000)
        dropdown.selectByIndex(1)
        browser.pause(2000)
        dropdown.selectByVisibleText('Friday')
        browser.pause(2000)
        dropdown.getValue() // Returns the 'value' attribute which is currently selected in dropdown.
        // chai is a library which supports assertions
        // We are using chai assertion library to compare 2 strings, 
        // we have also used expect() which is provided by webdriverio along with some matchers.
        // For more info navigate to: https://webdriver.io/docs/api/expect-webdriverio#matcher-options
        
        // Steps to install chai and also add dependency to package.json file -> npm install --save-dev chai
        // We have import chai library using require('chai') at the start of the file.
        // chai also provides an assertion called expect just like webdriverio provides, so there would be a confusion
        // For this we will give some new name

        expectchai(dropdown.getValue()).to.equal("Friday") // Comparing 2 Strings using chai
    })

    it('Dynamic Dropdown',()=>{
        browser.url("https://ksrtc.in/")
        $("#fromPlaceName").setValue("BENG")
        browser.pause(3000)
        let cities = $$("li[class='ui-menu-item'] a") // Fetching all cities from dynamic dropdown. ( space +  a moves from parent to child in css selector )
        for(var i = 0; i<cities.length; i++){
            console.log(cities[i].getText())
        }

        const desiredLocator = cities.filter(city=>city.getText() === "BENGALURU INTERNATION AIRPORT")
        desiredLocator[0].click() // Since filter returns Array
        browser.pause(3000)
    })

    it('Handling Checkboxes and Screenshot',()=>{
        browser.url("https://www.seleniumeasy.com/test/basic-checkbox-demo.html")
        const element = $("input[id='isAgeSelected']")
        element.click()
        console.log(element.isSelected()) // returns true if checkbox is selected
        browser.pause(3000)
        browser.saveScreenshot("screenshot.png") // Screenshot gets saved in the current working directory.
    })
})