describe('Login Application',()=>{
    it('Login Page Title',()=>{
        browser.url("https://the-internet.herokuapp.com/login")
        console.log(browser.getTitle())
        browser.pause(3000)
        expect(browser).toHaveTitleContaining("The Internet")
        
        // Locators supported by webdriverIO - xpath, css, linkText
        // CSS - tagname[attribute='value']
        // CSS - //#id
        // CSS - .classname
        // CSS - tagname[attribute*='value'] Same as how contains work in xpath.
        $("input[id='username']").setValue("tomsmith") // setValue clears any existing value if any and then enters the new value
        $("#password").setValue("SuperSecretPassword!")
        // browser.pause(3000)
        $("//button[@type='submit']").click()
        browser.pause(2000)
        const loggedIn = $(".flash.success")
        loggedIn.waitForExist() // Wait for timeout will be mentioned in wdio.cof.json
        // expect(loggedIn).toBeDisplayed() Assertion for Element to be displayed. Similar to isDisplayed() in selenium
        expect(browser).toHaveUrlContaining("/secure")
        expect(loggedIn).toHaveTextContaining("You logged into a secure area!") // Verify the text
    })

    it('Login Unsuccessful',()=>{
        browser.url("https://the-internet.herokuapp.com/login")
        $("input[id='username']").setValue("tomsmith") 
        $("#password").setValue("wrongpassword")
        $("//button[@type='submit']").click()
        // Wait based on condition
        browser.waitUntil(()=>($("#flash").getAttribute("class") === 'flash error'),{timeout:4000,timeoutMsg:"Error Message Encountered",interval:2})
        browser.pause(3000)
        // $("#flash").getText()
        expect($("#flash")).toHaveTextContaining("Your password is invalid!")
        // console.log($("#flash").getText())
    })
})