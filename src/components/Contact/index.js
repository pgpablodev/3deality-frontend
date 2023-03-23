import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faMapMarker, faPhone } from "@fortawesome/free-solid-svg-icons"

const Contact = () => {
    return(
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">¿Dudas? Contacta con nosotros</span></h2>
            </div>
            <div className="row px-xl-5 text-left">
                <div className="col-lg-7 mb-5">
                    <div className="contact-form">
                        <div id="success"></div>
                        <form name="sentMessage" id="contactForm" noValidate={true}>
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
                    <h5 className="font-weight-semi-bold mb-3">Encuéntranos</h5>
                    <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
                    <div className="d-flex flex-column mb-3">
                        <h5 className="font-weight-semi-bold mb-3">Tienda 1</h5>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faMapMarker}/></span>Calle Falsa 123, Zaragoza, España</p>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>soporte@3deality.com</p>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faPhone}/></span>+34 123 45 67 89</p>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="font-weight-semi-bold mb-3">Tienda 2</h5>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faMapMarker}/></span>Próximamente</p>
                        <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>Próximamente</p>
                        <p className="mb-0"><span className="text-primary mr-3"><FontAwesomeIcon icon={faPhone}/></span>Próximamente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact