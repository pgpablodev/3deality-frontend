import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faShippingFast, faExchangeAlt, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import Category from '../Category'
import Product from '../Product'

import { useState, useEffect } from 'react'

import axios from 'axios'

const endpoint = 'https://pablopovar.tblabs.es/api'

const Home = () => {
    const [loaded, setLoaded] = useState(false)

    const [articulos, setArticulos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [cCategorias, setCCategorias] = useState([])

    useEffect ( ()=> {
        getArticulos()
        getAllCategorias()
        countAllCategorias()            
    }, [])

    const getArticulos = async () => {
        const response = await axios.get(`${endpoint}/masvalorados`)
        setArticulos(response.data)
    }

    const getAllCategorias = async () => {
        const response = await axios.get(`${endpoint}/categorias`)
        setCategorias(response.data)
        setLoaded(true)
    }

    const countAllCategorias = async () => {
        const response = await axios.get(`${endpoint}/ccategorias`)
        setCCategorias(response.data)        
    }

    if(!loaded){
        return(
            <div></div>
        )
    }else{
        return(
            <>
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5 pb-3">
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="d-flex align-items-center border mb-4 bg-light" style={{padding: "30px"}}>
                                <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon icon={faCheck}/></h1>
                                <h5 className="font-weight-semi-bold m-0">Calidad óptima</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="d-flex align-items-center border mb-4 bg-light" style={{padding: "30px"}}>
                                <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon icon={faShippingFast}/></h1>
                                <h5 className="font-weight-semi-bold m-0">Envío rápido</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="d-flex align-items-center border mb-4 bg-light" style={{padding: "30px"}}>
                                <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon icon={faExchangeAlt}/></h1>
                                <h5 className="font-weight-semi-bold m-0">Devolución 14 días</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="d-flex align-items-center border mb-4 bg-light" style={{padding: "30px"}}>
                                <h1 className="text-primary m-0 mr-3"><FontAwesomeIcon icon={faPhoneVolume}/></h1>
                                <h5 className="font-weight-semi-bold m-0">Soporte 24/7</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5 pb-3">
                        <Category nombre={categorias[0].categoria} cantidad={cCategorias[0]} foto={"https://pablopovar.tblabs.es"+categorias[0].foto}/>
                        <Category nombre={categorias[1].categoria} cantidad={cCategorias[1]} foto={"https://pablopovar.tblabs.es"+categorias[1].foto}/>
                        <Category nombre={categorias[2].categoria} cantidad={cCategorias[2]} foto={"https://pablopovar.tblabs.es"+categorias[2].foto}/>
                    </div>
                </div>
                <div className="container-fluid pt-5">
                    <div className="text-center mb-4">
                        <h2 className="section-title px-5"><span className="px-2">Lo más vendido</span></h2>
                    </div>
                    <div className="row px-xl-5 pb-3">
                        {articulos.slice(0,8).map((articulo) => (
                            <Product key={articulo.id} id={articulo.id} nombre={articulo.nombre} precio={articulo.precio} foto={"https://pablopovar.tblabs.es"+articulo.foto} tam={3}/>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default Home