class LoginPage{

    get username(){
        return $("#username")

    }

    get password(){
        return $("#password")
    }

    get loginBtn(){
        return $("[type='submit']")
    }

    get alert(){
        return $("#flash-messages div")
    }

    Login(username, password){
        this.username.setValue(username)
        this.password.setValue(password)
        this.loginBtn.click()
        
    }
}

module.exports = new LoginPage() // We are exporting object of this class