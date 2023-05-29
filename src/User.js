class User{

    constructor(){
        this.init()
    }

    init(){
        this.id = localStorage.getItem('id')
        this.name = localStorage.getItem('userName')
        this.email = localStorage.getItem('userEmail')
        this.loggedIn = localStorage.getItem('userLoggedIn')
    }

    authenticated(data, callback){
        localStorage.setItem('id', data.id)
        localStorage.setItem('userName', data.name)
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userLoggedIn', true)

        this.init()

        callback()
    }

    isLoggedIn(){
        return Boolean(this.loggedIn) === true
    }

    destroy(){
        localStorage.clear()
    }

    logout(callback){
        this.destroy()
        
        callback()
    }
}

export default new User()