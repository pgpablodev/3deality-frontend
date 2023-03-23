import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import payments from '../../img/payments.png'

const Footer = () => {
    return(
        <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
            <div className="row px-xl-5 pt-5">
                <div className="col-lg-3 col-md-12 mb-5 pr-3 pr-xl-5 text-left">
                    <Link className="text-decoration-none" to="/">
                        <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-primary px-1 mr-1">3D</span>eality</h1>
                    </Link>
                    <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                    <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faMapMarker}/></span>Calle Falsa 123, Zaragoza, España</p>
                    <p className="mb-2"><span className="text-primary mr-3"><FontAwesomeIcon icon={faEnvelope}/></span>soporte@3deality.com</p>
                    <p className="mb-0"><span className="text-primary mr-3"><FontAwesomeIcon icon={faPhone}/></span>+34 123 45 67 89</p>
                </div>
                <div className="col-lg-5 col-md-12"></div>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4 text-right">Navegación</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <Link to="/" className="text-dark mb-4 mt-2 text-right">Inicio<span className="ml-2"><FontAwesomeIcon icon={faAngleLeft}/></span></Link>
                                <Link to="/shop" className="text-dark mb-4 text-right">Tienda<span className="ml-2"><FontAwesomeIcon icon={faAngleLeft}/></span></Link>
                                <Link to="/contact" className="text-dark text-right">Contacto<span className="ml-2"><FontAwesomeIcon icon={faAngleLeft}/></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border-top border-light mx-xl-5 py-4">
                <div className="col-md-6 px-xl-0">
                    <p className="mb-md-0 text-center text-md-left text-dark">
                        &copy;<Link className="text-dark font-weight-semi-bold" to="/">3Deality</Link>. Todos los derechos reservados. Plantilla diseñada
                        por
                        <a className="text-dark font-weight-semi-bold" href="https://htmlcodex.com"starget="_blank" rel="noopener noreferrer"> HTML Codex</a><br></br>
                        Plantilla distribuida por <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer">ThemeWagon</a>
                    </p>
                </div>
                <div className="col-md-6 px-xl-0 text-center text-md-right">
                    <img className="img-fluid" src={payments} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Footer