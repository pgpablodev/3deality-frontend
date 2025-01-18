import axios from "axios"
import User from "../../User"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUser, faFilePdf, faHome, faGlobe, faCrown, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"

const Account = () => {

    const endpoint = 'https://pablopovar.tblabs.es/api'

    const [pedidos, setPedidos] = useState([])
    const [cliente, setCliente] = useState({})

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
            console.log(response)
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
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post(`${endpoint}/register`, regCredentials).then(async (response) => {
            const { value: fin } = await Swal.fire({
                title: "<strong>Usuario registrado correctamente</strong>",
                html: "<i>Hola "+regCredentials.name+". Deberá introducir sus credenciales para acceder.</i>",
                confirmButtonText: 'Entendido',
                icon: 'success'
            })
    
            if(fin) window.location.replace('/')
        }).catch((response) => {
            const error = JSON.stringify(response.data)
            console.log(response)
            document.getElementById("error-warn-rg").style.visibility = "visible"
            document.getElementById("error-warn-rg").innerText = error            
        })
    }

    const getPedidos = async () => {
        await axios.get(`${endpoint}/pedidoscliente/${localStorage.getItem('id')}`).then((response) => {
            setPedidos(response.data.toReversed())
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    const getCliente = async () => {
        await axios.get(`${endpoint}/usuario/${localStorage.getItem('id')}`).then((response) => {
            setCliente(response.data)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    useEffect(() => {
        getPedidos()
        getCliente()
    }, [])

    const formatoFecha = (fecha) => {
        const anio = fecha.slice(0,4)
        const mes = fecha.slice(5,7)
        const dia = fecha.slice(8,10)
        const hora = fecha.slice(11,13)
        const minuto = fecha.slice(14,16)
        let mesString = ""
        switch(Number(mes)){
            case 1:
                mesString = "enero"
                break
            case 2:
                mesString = "febrero"
                break
            case 3:
                mesString = "marzo"
                break
            case 4:
                mesString = "abril"
                break
            case 5:
                mesString = "mayo"
                break
            case 6:
                mesString = "junio"
                break
            case 7:
                mesString = "julio"
                break
            case 8:
                mesString = "agosto"
                break
            case 9:
                mesString = "septiembre"
                break
            case 10:
                mesString = "octubre"
                break
            case 11:
                mesString = "noviembre"
                break
            case 12:
                mesString = "diciembre"
                break
            default:
                mesString = "mes inválido"
        }

        return `${dia} de ${mesString} de ${anio} - ${hora}:${minuto}`
    }

    if(localStorage.getItem('userName')===null){
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
                                        <input type="text" className="form-control" id="name" placeholder="Nombre"
                                            required="required" data-validation-required-message="Por favor, introduzca su nombre" />
                                        <p className="help-block text-danger"></p>
                                    </div>
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
                            {
                            cliente.es_admin === 1
                            ?
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faCrown}/></span>Administrador de 3Deality</p>
                            :
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faCircleUser}/></span>Cliente de 3Deality</p>
                            }                           
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faUser}/></span>{localStorage.getItem('userName')}</p>
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>{localStorage.getItem('userEmail')}</p>
                            {
                            cliente.ciudad !== ""
                            ?
                            <>
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faGlobe}/></span>{`${cliente.pais}, ${cliente.provincia}, ${cliente.ciudad}`}</p>
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faHome}/></span>{`${cliente.direccion}, ${cliente.cp}`}</p>
                            </>
                            :
                            <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faHome}/></span>No se ha registrado una dirección de envío</p>
                            }
                        </div>
                        {
                        pedidos.length>0
                        ?
                        <h3 className="px-5"><span className="px-2">Mis pedidos</span></h3>
                        :
                        <p className="px-5"><span className="px-2">Aún no ha realizado ningún pedido.</span></p>
                        }
                        <div className="d-flex flex-column my-3">
                            {pedidos.map((pedido, pedidoIndex) => (
                                <p key={pedidoIndex} className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faFilePdf}/></span><Link to={"/pdfpedido/:"+pedido.id}>{formatoFecha(pedido.created_at)}</Link></p>
                            ))}                            
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }
}

export default Account