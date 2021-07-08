describe('Windows and Frames',()=>{
    it('Parent and Child Window Switch',()=>{
        browser.url("http://www.seleniumframework.com/demo-sites/")
        const bottomElement = $("a[title*='Frameworks']")
        bottomElement.scrollIntoView()   // Navigate to Sign In button at the bottom 
        browser.pause(3000)
        bottomElement.click()
        var handles = browser.getWindowHandles()
        // Parent window will be at 0th index and child window will be at 1st index
        browser.switchToWindow(handles[1]) // Navigate to child window
        console.log(browser.getTitle())
        expect(browser).toHaveTitleContaining("Selenium Framework | What are Frameworks?")
        browser.maximizeWindow() // Maximizes window
        browser.pause(2000)
        browser.closeWindow() // Closes the current window
        browser.pause(2000)
        browser.switchToWindow(handles[0])
        expect(browser).toHaveTitleContaining("Selenium Framework | Demo Sites")
    })

    it('New Window',()=>{
         // In switchToWindow(), windows are opened by browser, we have to switch to new window.
         // newWindow() is used to open a new window on the fly.
         browser.url("https://www.google.com")
         browser.newWindow("https://www.selenium.dev/")
         const title = browser.getTitle()
         // Here switchWindow is used not switchToWindow.Switch Window can be done using URL as well as Title.
         browser.switchWindow("https://www.google.com") 
         $("[name='q']").setValue(title)
         browser.keys('Enter')
         browser.pause(2000)
         browser.switchWindow("https://www.selenium.dev/")
         console.log(browser.getTitle())
         browser.pause(2000)

    })

    it('Handling Frames Switch',()=>{
        browser.url("https://www.globalsqa.com/demo-site/frames-and-windows/#iFrame")
        console.log($$("a").length)
        var anchorDefCount = $$("a").length
        browser.switchToFrame($("iframe[name='globalSqa']"))
        console.log($$("a").length)
        browser.switchToFrame(null) // when frameId is passed as null, server switches to page's default content
        console.log($$("a").length)
        expect($$("a").length).toEqual(anchorDefCount)

    })
})