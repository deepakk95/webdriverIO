// Merging the parent conf object + add new changes in uat config ( timeout, baseurl)

const merge = require('deepmerge')
const wdioConf = require('./wdio.conf')

exports.config = merge(wdioConf.config,{    // config is the object of wdio.conf.js which is being exported.

    baseUrl : 'https://the-internet.herokuapp.com',
    waitforTimeout : 5000,

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        grep: 'Smoke' // We can specify grep in mochaOpts instead of sending it through command line.
    },
    logLevel: 'info'
})  