const loginPage = require('../pageObjects/LoginPage') // Here loginPage is the object for LoginPage class 
                                                         //which is exported from LoginPage.js and imported to current file.

const fs = require('fs')
let credentials = JSON.parse(fs.readFileSync("test/testData/LoginTest.json"))

describe('Login Application',()=>{
    it('Login Fail - Smoke',function(){
        this.retries(2)
        browser.url("/login") // BaseUrl has been defined in the wdio.conf.js file.
        console.log(browser.getTitle())
        browser.pause(3000)
        expect(browser).toHaveTitleContaining("The Innternet")
        loginPage.Login("tomsmith","wrongPass")
        browser.pause(2000)
        console.log(loginPage.alert.getText())
        expect(loginPage.alert).toHaveTextContaining("Your password is invalid!")
        loginPage.Login("wrongUsername","SuperSecretPassword!")
        console.log(loginPage.alert.getText())
        expect(loginPage.alert).toHaveTextContaining("Your username is invalid!") 
        
    })

    credentials.forEach( ({username,password}) => {    // This test will run with 2 sets of data provided in LoginTest.json file.
    it('Login Fail using Json DataSet',()=>{
        browser.url("https://the-internet.herokuapp.com/login")
        loginPage.Login(username,password)     
        browser.pause(2000)   
        expect(loginPage.alert).toHaveTextContaining("Your password is invalid!")
        
        })
    }) 
})  
                                               