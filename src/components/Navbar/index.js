import foto1 from '../../img/carousel-1.jpg'
import { Link } from 'react-router-dom'

const Navbar = ({imagen}) => {

    let accountHTML = ""

    if(localStorage.getItem('userName')===null){
        accountHTML = <div className="navbar-nav ml-auto py-0">
            <Link to="/account" className="nav-item nav-link">Iniciar sesión</Link>
            <Link to="/account" className="nav-item nav-link">Registrarse</Link>
        </div>
    }else{
        accountHTML = <div className="navbar-nav ml-auto py-0">
            <Link to="/account" className="nav-item nav-link">Mi cuenta</Link>
        </div>
    }

    if(imagen){
        return(
            <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link className="text-decoration-none d-block d-lg-none" to="/">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">3D</span>eality</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link className="nav-item nav-link active" to="/">Inicio</Link>
                                    <Link className="nav-item nav-link active" to="/shop">Tienda</Link>
                                    <Link className="nav-item nav-link active" to="/contact">Contacto</Link>
                                </div>
                                {accountHTML}
                            </div>
                        </nav>
                        <div id="header-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" style={{height: "410px"}}>
                                    <img className="img-fluid" src={foto1} alt="Banner"></img>
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{maxWidth: "700px"}}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">Descuento 10% en el primer pedido</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Los mejores equipos y materiales</h3>
                                            <Link className="btn btn-light py-2 px-3" to="/shop">¡Compra!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="container-fluid mb-1">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link className="text-decoration-none d-block d-lg-none" to="/">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">3D</span>eality</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link className="nav-item nav-link active" to="/">Inicio</Link>
                                    <Link className="nav-item nav-link active" to="/shop">Tienda</Link>
                                    <Link className="nav-item nav-link active" to="/contact">Contacto</Link>
                                </div>
                                {accountHTML}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }    
}

export default Navbar