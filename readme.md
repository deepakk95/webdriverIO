WebDriverIO
------------  

__Steps to setup:__

1. Install node.js in the system.  
2. Create a new folder open it in any editor ( Ex. Vs code ).  
3. Enter the following commands in terminal:  
“npm i --save-dev install @wdio/cli”     &nbsp;&nbsp;// to get webdriverio dependency.  
“npx wdio config -y”               &nbsp; &nbsp;&nbsp;&nbsp; // Create a new configuration file to run test cases from test runner.  
// npx search for executable file in node_modules folder.

`In package.json add dependency of @wdio/sync -> "@wdio/sync": "7.7.4" and execute npm install.`

Test cases are written in Spec File.
Inside the spec file, we have describe block ( describe block acts as Test Suite ).
Within describe block we have “it” block ( it block represents test case ).
Within one test suite, we can define multiple describe blocks and within one describe block we can define multiple it blocks.

Remove the existing dummy specs added in specs folder under test folder.

Create a new file jsconfig.json in root directory so that we can use autocomplete feature in vscode. ( Link -> https://webdriver.io/docs/autocompletion/ )
Add the following code to jsconfig.json file.
``` {
      "compilerOptions": {
          "types": [
              "node",
              "webdriverio/sync",
              "@wdio/mocha-framework"
          ]
      },
      "include": [
          "test/specs/*.js",
          "**/*.json",
          "node_modules/@wdio/sync",
          "node_modules/@wdio/mocha-framework"
      ]
    }
    
```

To run our first test case, we have to use config file which we created.
Command to run config file -> npx wdio run configuration_file_name ( In our case it will be “npx wdio run wdio.conf.js” )

To remove info level logs, change “logLevel” in wdio.conf.js from “info” to “silent”. Then we only get logs what our test case directs.

—————————————————————
Locators
WebDriverIO supports xpath, css, linkText


Lets say Element is <a class=‘nav-link>Checkout (0)</a>

Linktext element would be $(“=Checkout (0)”), if we want to use contains in linktext then it would be $(“*=Checkout”)

———————————————————————
Currently, following configuration is added to `wdio.config.js` in chrome headless browser: ``` 'goog:chromeOptions': {
            // to run chrome headless the following flags are required
            // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
             args: ['--headless', '--disable-gpu'],
            },
```

Official Docs for Test Runner Configuration -> https://webdriver.io/docs/configurationfile/

—————————————————————————————————————————
Running Selected Tests using Mocha Grep options in Framework ->

Enter keyword like “Smoke” or “Regression” in every test I.e every it() block. Use the following command to execute selected test cases : 

npx wdio run wdio.conf.js --mochaOpts.grep Smoke   

———————————————————————————————
“bail” keyword in wdio.config.js refers to the number of failures when encountered, then our test case execution will get stopped.
Example -> bail:3 , then test case execution will be stopped when 3 failures will be encountered.

——————————————————————————————————————————
baseUrl in wdio.conf.js is used to configure the baseUrl of the application like “https://the-internet.herokuapp.com”
When we run the tests, then we just need to append the resource to the baseUrl like “/login” and the complete url will become -> “https://the-internet.herokuapp.com/login”

—————————————————————————————————————
Earlier we ran selected test cases using mochaOpts.grep command. What if we have to run some specific complete suits ?
There is another way of doing it. We have to specify suit files in wdio.config.js
Example -> 
suites:{
        uicontrolandframes:['test/specs/uiControls.js','test/specs/windowFrames.js'],
        logintests:['test/specs/LoginTest.js']
    }
Now while running through command line we use “- -suite”
Example -> “npx wdio run wdio.conf.js --suite logintests”

———————————————————————————————————————
If we want to tell the spec file that’s needed to be run at runtime,  we can use this command without making changes in config file.
“npx wdio run wdio.conf.js - -spec test/specs/functionalScenarios.js”
If we want to run multiple spec files at runtime we can relative path of each spec file followed by comma.

——————————————————————————————————————
exclude array in wdio.conf.js used to exclude certain spec files from execution, we just need to tell the relative file of each spec file that we want to exclude.

—————————————————————————————————————
In WebDriverIO we can have n number of configuration files. 
For different environments, we can create different config file which could have different timeout values, different set of capabilities, different baseUrl.

We can merge the parent config file with the child config file that we create. The properties which won’t be mentioned in the child config will be inherited from parent config file.

—————————————————————————————————————
 How to apply retry mechanism for Flaky Tests with webdriverio config?

For retry, we have to write “this.retries(x)” where x is any integer value. x would specify the test to only retry “x” number of times.
To use this.retries(x), we cannot use fat arrow function like ()=>, we have to use normal function(){}. This is mentioned in mocha docs.

Official Docs -> https://webdriver.io/docs/retry/

—————————————————————————————————————————
Generating Scripts through node.js from package.json file

Every time we want to execute our test cases using webdriverio, we need to run some suites with the name “uicontrolandframes”.
Now for this every time we have to execute command “npx wdio run wdio.conf.json - -suite uicontrolandframes”.

To avoid this, we can put this command in “scripts” object in package.json file like “controlandframesTests”: “npx wdio run wdio.conf.json - -suite uicontrolandframes”
Then we can use command -> “npm run controlandframesTests”

Similarly we can something like “QARegression”:”npx wdio run wdio.conf.js” in scripts and then make use of “npm run QARegression” to run all regression specs.

—————————————————————————————————————————

Allure is one the package which will help to generate reports. We have to install allure report package.
Command -> “npm install @wdio/allure-reporter --save-dev”.
Once it’s installed we have to set one configuration in config.js file.
```
reporters: [['allure', {
        outputDir: 'allure-results',
        // disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],

```
Above reporters should be placed below existing reporters which are already added in wdio.conf.js file “reporters: ['spec’],” to override it.

Uncomment afterTest in wdio.conf.json and enter following code to take screenshots -> 
``` if (error) {
            browser.takeScreenshot();
          }
```

We will find that allure-reports folder is populated with xml files.
To combined it with the reporter, we need to install allure command-line by using command “npm install allure-commandline --save-dev” followed by command :
“allure generate [allure_output_dir] && allure open” 
The above command is given after the execution is completed.


Official Docs -> https://webdriver.io/docs/allure-reporter/

—————————————————————————————————————————
We can configure our project with Jenkins by creating a job and using execute shell command in Build Actions.
We can use “This project is parameterised” and provide name as “parameter_name” and multiple choices like “smoke”, “regression”.
Now command used in shell script will be npm run “$parameter_name”.
Now we will get the option for this job to “Run with Parameters” and we can select the parameter while executing job at runtime.

Official Doc for installing and configuring Allure Jenkins Plugin -> https://webdriver.io/docs/allure-reporter/ & https://docs.qameta.io/allure/#_jenkins

Install Allure Jenkins Plugin from Plugin Manager.
Navigate to Global Tool Configuration and click on Allure Commandline Installations.
Click on add installer and select “zip/tar.gz” and we have to provide binary archive file of allure -> https://github.com/allure-framework/allure2/releases
Copy the “download” link from the above url and paste it in “Download URL for binary archive” and Save.

Now in our job that we created, we can add Allure Report Plugin in Post Build Actions






















