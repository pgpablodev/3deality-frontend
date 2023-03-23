class User {

    constructor() {
        this.init()
    }

    init() {
        this.name = sessionStorage.getItem('userName')
        this.email = sessionStorage.getItem('userEmail')
        this.loggedIn = sessionStorage.getItem('userLoggedIn')
    }

    /**
     *
     * @param data object
     * @param data.name string
     * @param data.email string
     * @param callback function
     */
    authenticated(data, callback) {
        sessionStorage.setItem('userName', data.name)
        sessionStorage.setItem('userEmail', data.email)
        sessionStorage.setItem('userLoggedIn', true)

        this.init()

        callback()
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }

    /**
     * Remove all user's data from local storage
     */
    destroy() {
        sessionStorage.clear()
    }

    /**
     *
     * @param callback function
     */
    logout(callback) {
        this.destroy()
        
        callback()
    }
}

export default new User()