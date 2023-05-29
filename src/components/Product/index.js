import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons"

import LineaPedido from "../../LineaPedido"

const Product = ({id, nombre, precio, foto, tam}) => {    

    let precioAlto = (Math.round((precio*1.3) * 100) / 100).toFixed(2)
    precio = (Math.round(precio * 100) / 100).toFixed(2)

    const aniadeACarrito = () => {
        if(localStorage.getItem('userLoggedIn')===null){
            window.location.replace('/#/account')
        }else{
            const datos = {
                id_articulo: id,
                cantidad: 1
            }
            LineaPedido.makeLinea(datos, toCartCallback)
        }

        function toCartCallback(){
            window.location.replace('/#/cart')
        }
    }

    return(
        <div className={`col-lg-${tam} col-md-6 col-sm-12 pb-1`}>
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style={{height: "500px"}}>
                    <Link to={"/item/:"+id}><img className="img-fluid h-100" src={foto} alt=""></img></Link>
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <Link to={"/item/:"+id}><h6 className="text-truncate mb-3">{nombre}</h6></Link>
                    <div className="d-flex justify-content-center">
                        <h6>{precio} €</h6><h6 className="text-muted ml-2"><del>{precioAlto} €</del></h6>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link className="btn btn-sm text-dark p-0" to={"/item/:"+id}><span className="text-primary mr-1"><FontAwesomeIcon icon={faEye}/></span>Ver producto</Link>
                    <button id="btnCarrito" className="btn btn-sm text-dark p-0" onClick={() => {aniadeACarrito()}}><span className="text-primary mr-1"><FontAwesomeIcon icon={faShoppingCart}/></span>Añadir al carro</button>
                </div>
            </div>
        </div>
    )
}

export default Product