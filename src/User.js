class User{

    constructor(){
        this.init()
    }

    init(){
        this.id = sessionStorage.getItem('id')
        this.name = sessionStorage.getItem('userName')
        this.email = sessionStorage.getItem('userEmail')
        this.loggedIn = sessionStorage.getItem('userLoggedIn')
    }

    authenticated(data, callback){
        sessionStorage.setItem('id', data.id)
        sessionStorage.setItem('userName', data.name)
        sessionStorage.setItem('userEmail', data.email)
        sessionStorage.setItem('userLoggedIn', true)

        this.init()

        callback()
    }

    isLoggedIn(){
        return Boolean(this.loggedIn) === true
    }

    destroy(){
        sessionStorage.clear()
    }

    logout(callback){
        this.destroy()
        
        callback()
    }
}

export default new User()