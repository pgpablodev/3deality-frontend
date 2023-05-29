import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faMapMarker, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Contact = () => {

    const [mes, setMes] = useState("")
    const fecha = new Date()
    fecha.setMonth(fecha.getMonth()+2)

    useEffect(() => {
        switch(fecha.getMonth()){
            case 0:
                setMes("enero")
                break
            case 1:
                setMes("febrero")
                break
            case 2:
                setMes("marzo")
                break
            case 3:
                setMes("abril")
                break
            case 4:
                setMes("mayo")
                break
            case 5:
                setMes("junio")
                break
            case 6:
                setMes("julio")
                break
            case 7:
                setMes("agosto")
                break
            case 8:
                setMes("septiembre")
                break
            case 9:
                setMes("octubre")
                break
            case 10:
                setMes("noviembre")
                break
            default:
                setMes("diciembre")
                break
        }
    }, [mes])

    const contactMockUp = async (e) => {
        e.preventDefault()
        const { value: fin } = await Swal.fire({
            title: "<strong>Mensaje enviado correctamente</strong>",
            html: "<i>A continuación será redirigido a la página de inicio</i>",
            confirmButtonText: 'Aceptar',
            icon: 'success'
        })

        if(fin) window.location.replace('/')
    }

    return(
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">¿Dudas? Contacta con nosotros</span></h2>
            </div>
            <div className="row px-xl-5 text-left">
                <div className="col-lg-7 mb-5">
                    <div className="contact-form">
                        <div id="success"></div>
                        <form name="sentMessage" id="contactForm" noValidate={true} onSubmit={(e) => {contactMockUp(e)}}>
                            <div className="control-group">
                                <input type="text" className="form-control" id="name" placeholder="Nombre"
                                    required="required" data-validation-required-message="Por favor, introduzca su nombre" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <input type="email" className="form-control" id="email" placeholder="Correo"
                                    required="required" data-validation-required-message="Por favor, introduzca su correo" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <input type="text" className="form-control" id="subject" placeholder="Asunto"
                                    required="required" data-validation-required-message="Por favor, especifique un asunto" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <textarea className="form-control" rows="6" id="message" placeholder="Mensaje"
                                    required="required"
                                    data-validation-required-message="Por favor, redacte un mensaje"></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Contactar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-5 mb-5 text-left">
                    <h4 className="font-weight-semi-bold mb-3">Encuéntranos</h4>
                    <div className="d-flex flex-column mb-3">
                        <h5 className="font-weight-semi-bold mb-3">Próxima apertura &emsp;<span className="text-info small font-weight-light">{mes +" " +fecha.getFullYear()}</span></h5>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faMapMarker}/></span>Calle Falsa 123, Zaragoza, España</p>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>soporte@3deality.com</p>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faPhone}/></span>+34 123 45 67 89</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact