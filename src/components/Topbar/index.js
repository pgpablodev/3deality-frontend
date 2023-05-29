import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Topbar = () => {

    const [numCarrito, setNumCarrito] = useState(localStorage.length-4) //le resto 4 porque siempre hay 4 registros en localStorage asociados a las variables de sesión

    useEffect(() => {    
        if(localStorage.getItem('id')===null)
            setNumCarrito(0)   
        else
            setNumCarrito(localStorage.length-4)
    }, [localStorage.length])
     
    return(
        <div className="container-fluid">
            <div className="row bg-secondary py-2 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block text-left">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark" href="https://pablopg.dev" target="_blank" rel="noopener noreferrer">PabloPG</a>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark px-2" href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                        <a className="text-dark pl-2" href="https://github.com/pgpablodev/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link className="text-decoration-none text-left" to="/">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-primary px-1 mr-1">3D</span>eality</h1>
                    </Link>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <Link to="/cart" className="btn border">
                        <span className="text-primary"><FontAwesomeIcon icon={faShoppingCart}/></span>
                        <span className="badge">{numCarrito}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Topbar