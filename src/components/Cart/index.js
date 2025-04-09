import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import axios from 'axios'

const Cart = () => {

    const [articulos, setArticulos] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [envio, setEnvio] = useState(0)

    const endpoint = 'https://pgpablo.helioho.st/api/lista'

    const getArticulosLista = async () => {
        const keys = Object.keys({...localStorage})
        const listaCompra = Object.values({...localStorage})
        
        const idsArticulo = []
        const cargaCantidades = []

        for(let i=0;i<listaCompra.length;i++){
            if(keys[i]!=='userEmail' && keys[i]!=='userName' && keys[i]!=='userLoggedIn' && keys[i]!=='id'){
                idsArticulo.push(JSON.parse(listaCompra[i]).id_articulo)
                cargaCantidades.push(JSON.parse(listaCompra[i]).cantidad)
            }       
        }

        setCantidades(cargaCantidades)

        await axios.get(`${endpoint}/${JSON.stringify(idsArticulo)}`).then((response) => {
            if(articulos.length===0) setArticulos(response.data)
        })  
    }

    useEffect(() => {       
        getArticulosLista()

        let suma = 0
        for(let i=0; i<articulos.length; i++){
            suma += articulos[i].precio*cantidades[i]*1.21
        }

        setSubtotal((Math.round((suma) * 100) / 100).toFixed(2))
        setEnvio((Math.round((subtotal*0.05) * 100) / 100).toFixed(2))
    }, [articulos])

    const eliminarArticulo = (id) => {        
        localStorage.removeItem("articulo"+id)
        document.getElementById("fila"+id).style.display = "none"

        let nuevoSubtotal = subtotal

        for(let i=0; i<articulos.length; i++){
            if(articulos[i].id === id) nuevoSubtotal -= articulos[i].precio*cantidades[i]*1.21
        }

        if(document.getElementsByClassName("filas-tabla").length>0){
            setSubtotal((Math.round((nuevoSubtotal) * 100) / 100).toFixed(2))
            setEnvio((Math.round((nuevoSubtotal*0.05) * 100) / 100).toFixed(2))
        }else{
            setSubtotal(0)
            setEnvio(0)
        }

        window.location.replace("/#/cart")
    }

    if(localStorage.getItem('userLoggedIn')===null){
        window.location.replace('/#/account')
    }else{
        return(
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total (IVA)</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            {
                            articulos.length!==0
                            ?
                            <tbody className="align-middle">
                                {articulos.map((articulo, articuloIndex) => (
                                    <tr className="filas-tabla" key={articuloIndex} id={"fila"+articulo.id}>
                                        <td className="align-middle">{articulo.nombre}</td>
                                        <td className="align-middle">{articulo.precio} €</td>
                                        <td className="align-middle">
                                            {cantidades[articuloIndex]}
                                        </td>
                                        <td className="align-middle">{(Math.round((articulo.precio*cantidades[articuloIndex]*1.21) * 100) / 100).toFixed(2)} €</td>
                                        <td className="align-middle"><button onClick={() => {eliminarArticulo(articulo.id)}} className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrash}/></button></td>
                                    </tr>
                                ))}                        
                            </tbody>
                            :
                            <tbody className="align-middle">
                                <tr>
                                    <td className="align-middle" colSpan={5}>No se ha añadido nada al carrito.</td>
                                </tr>
                            </tbody>
                            }
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Resumen del carrito</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{subtotal} €</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Costes de envío</h6>
                                    <h6 className="font-weight-medium">{envio} €</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>                                
                                    <h5 className="font-weight-bold">{(Math.round((Number(subtotal) + Number(envio)) * 100) / 100).toFixed(2)} €</h5>
                                </div>
                                <Link className="btn btn-block btn-primary my-3 py-3" to="/checkout">Realizar pedido</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}

export default Cart