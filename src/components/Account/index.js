import axios from "axios";
import User from "../../User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

const Account = () => {

    const endpoint = 'http://localhost:8000/api'

    const handleSubmit = (event) => {
        document.getElementById("error-warn").visibility = "hidden"
        event.preventDefault()
    
        const loginCredentials = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        function authenticatedCallback() {
            window.location.replace('/')
        }

    
        axios.post(`${endpoint}/login`, loginCredentials).then((response) => {
            User.authenticated(response.data, authenticatedCallback)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            document.getElementById("error-warn").style.visibility = "visible"
            document.getElementById("error-warn").innerText = error.slice(10,error.length-2)            
        })
    }

    const handleLogout = (e) => {
        e.preventDefault()

        const afterUserDestroyed = () => {
            window.location.replace('/')
        }

        axios.post(`${endpoint}/logout`)
        .then(() => {
            User.logout(afterUserDestroyed)
        })
        
    }

    const handleRegister = (event) => {
        document.getElementById("error-warn-rg").visibility = "hidden"
        event.preventDefault()

        const regCredentials = {
            name: event.target.email.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post(`${endpoint}/register`, regCredentials).then((response) => {
            console.log('Registro exitoso')
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            document.getElementById("error-warn-rg").style.visibility = "visible"
            document.getElementById("error-warn-rg").innerText = error            
        })
    }

    if(sessionStorage.getItem('userName')===null){
        return(
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Mi cuenta</span></h2>
                </div>
                <div className="row px-xl-5 text-left">
                    <div className="col-lg-2 mb-5"></div>
                    <div className="col-lg-3 mb-5">
                        <div className="text-center">
                            <h2 className="section-title px-5"><span className="px-2">Acceso</span></h2>
                        </div>
                        <div className="text-center mb-4">
                            <h6 id="error-warn" className="badge-danger px-5" style={{"visibility": "hidden"}}>Error</h6>
                        </div>
                        <div className="contact-form">
                            <div id="success"></div>
                            <form name="login" id="login" onSubmit={(e) => {handleSubmit(e)}}>
                                <div className="control-group">
                                    <input type="text" className="form-control" id="email" placeholder="Correo electrónico"
                                        required="required" data-validation-required-message="Por favor, introduzca su nombre" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input type="password" className="form-control" id="password" placeholder="Contraseña"
                                        required="required" data-validation-required-message="Contraseña incorrecta" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary py-2 px-4" id="btnLogin">Acceder</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-1 mb-5"></div>
                    <div className="col-lg-4 mb-5 text-left">
                        <div className="text-center">
                            <h2 className="section-title px-5"><span className="px-2">Registro</span></h2>
                        </div>
                        <div className="text-center mb-4">
                            <h6 id="error-warn-rg" className="badge-danger px-5" style={{"visibility": "hidden"}}>Error</h6>
                        </div>
                        <div className="contact-form">
                            <div id="success"></div>
                                <form name="registro" id="registro" onSubmit={(e) => {handleRegister(e)}}>
                                    <div className="control-group">
                                        <input type="email" className="form-control" id="email" placeholder="Correo electrónico"
                                            required="required" data-validation-required-message="Por favor, introduzca su correo" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="password" className="form-control" id="password" placeholder="Contraseña"
                                            required="required" data-validation-required-message="Contraseña incorrecta" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary py-2 px-4" id="btnRegistro">Registrarse</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
                <div className="col-lg-2 mb-5"></div>
            </div>
        )
    }else{
        return(
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Mi cuenta</span></h2>
                </div>
                <button className="btn btn-danger py-1 px-2 mb-4" id="btnLogout" onClick={(e) => {handleLogout(e)}}>Cerrar sesión</button>
                <div className="row px-xl-5 text-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 text-center">
                        <h3 className="px-5"><span className="px-2">Información</span></h3>
                        <div className="d-flex flex-column my-3">                            
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faUser}/></span>{sessionStorage.getItem('userName')}</p>
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>{sessionStorage.getItem('userEmail')}</p>
                        </div>
                        <h3 className="px-5"><span className="px-2">Mis pedidos</span></h3>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default Account