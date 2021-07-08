const expectchai = require('chai').expect

describe('Functional Scenarios',()=>{
    it('Double Click and Alert Handling',()=>{
        browser.url("http://only-testing-blog.blogspot.com/")
        $("button").scrollIntoView()
        $("button").doubleClick()
        browser.pause(3000)
        console.log(browser.isAlertOpen()) // true
        // We can make use of chai assertion to check if it returns true
        expectchai(browser.isAlertOpen()).to.be.true
        console.log(browser.getAlertText()) // fetching alert text
        // Asserting alert text using chai
        expectchai(browser.getAlertText()).to.equal("Press 'OK' or 'Cancel' button!")
        browser.acceptAlert() // Accepting the alert
        browser.pause(2000)
    })
    
    
    it('Mouse Hover',()=>{
        browser.url("https://www.amazon.in/")
        $("#nav-link-accountList").moveTo() // Simar to mouseHover in Selenium
        browser.pause(3000)
    })

    it('Web Tables Sort Validation',()=>{
        browser.url("https://www.seleniumeasy.com/test/table-sort-search-demo.html")
        $("tr th:nth-child(1)").click()
        browser.pause(1000)
        $("tr th:nth-child(1)").click()
        // Retrieve the list of names into array A
        // Sort array A and create array B out of it
        const nameLocators = $$("tr td:nth-child(1)")
        const originalNames = nameLocators.map(nameLocator=>nameLocator.getText()) // Fetching text for each locator in the list.
        console.log(originalNames)
        // In JS array are passed by reference. Here names is getting sorted and sortedNames is pointing to names array.
        // To avoid it, we can take the copy of array instead of taking original array.
        names = originalNames.slice() // slice() is a method used to take a copy of original array.
        sortedNames = names.sort() // With this, we are sorting names as well as sortedName since array in JS are passed by reference
        console.log(sortedNames)
        expectchai(originalNames).to.eql(sortedNames)
         
    })

    it('Web Table Filter Validation',()=>{
        browser.url("https://www.seleniumeasy.com/test/table-sort-search-demo.html")
        $("input[type='search']").setValue("Kelly")
        const nameLocator = $$("tr td:nth-child(1)")
        expect(nameLocator).toBeElementsArrayOfSize(1) // Verifying size of array.
        console.log(nameLocator[0].getText())
        expect(nameLocator[0]).toHaveTextContaining("Kelly")

    })

    it('Scroll to particular element View',()=>{
        browser.url("http://www.seleniumframework.com/demo-sites/")
        const bottomElement = $("a[title*='Frameworks']")
        bottomElement.scrollIntoView()   // Navigate to Sign In button at the bottom 
        browser.pause(3000)
        bottomElement.click()
        browser.pause(3000)
        
    })
    
})