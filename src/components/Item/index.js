import Product from '../Product'
import foto from '../../img/prueba.png' //temporal
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faShoppingCart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'

import axios from 'axios'

import LineaPedido from '../../LineaPedido'

const Item = () => {   

    const endpoint = 'http://localhost:8000/api/articulo'
    
    const [articulo, setArticulo] = useState([])
    const [productos, setProductos] = useState([])

    const id = useParams().id.slice(1,useParams().id.length)
    useEffect( () => {
        const getArticuloById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setArticulo(response.data)            
        }
        getArticuloById()

        const getProductosSugeridos = async () => {
            const response = await axios.get(`http://localhost:8000/api/sugeridos`)
            setProductos(response.data)
        }

        getProductosSugeridos()
    }, [id])

    const aleatorio = Math.round(Math.random() * (154 - 25) + 25)

    const valoracion = []

    if(Number(articulo.valoracion)===0){
        for(let i=0;i<5;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===0.5){
        valoracion.push(<FontAwesomeIcon icon={faStarHalfAlt} size="xs"/>)
        for(let i=0;i<4;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===1){
        valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)
        for(let i=0;i<4;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===1.5){
        valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)
        valoracion.push(<FontAwesomeIcon icon={faStarHalfAlt} size="xs"/>)
        for(let i=0;i<3;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===2){
        for(let i=0;i<2;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)        
        for(let i=0;i<3;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===2.5){
        for(let i=0;i<2;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)
        valoracion.push(<FontAwesomeIcon icon={faStarHalfAlt} size="xs"/>)       
        for(let i=0;i<2;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===3){
        for(let i=0;i<3;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)     
        for(let i=0;i<2;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===3.5){
        for(let i=0;i<3;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)
        valoracion.push(<FontAwesomeIcon icon={faStarHalfAlt} size="xs"/>)       
        valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===4){
        for(let i=0;i<4;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)   
        valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }else if(Number(articulo.valoracion)===4.5){
        for(let i=0;i<4;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)
        valoracion.push(<FontAwesomeIcon icon={faStarHalfAlt} size="xs"/>)       
    }else if(Number(articulo.valoracion)===5){
        for(let i=0;i<5;i++)
            valoracion.push(<FontAwesomeIcon icon={faStar} size="xs"/>)      
    }else{
        for(let i=0;i<5;i++)
            valoracion.push(<FontAwesomeIcon icon={farStar} size="xs"/>)
    }

    const modificaCantidad = (op) => {
        if(op==='s'){
            if(document.getElementById('cantidad').value<10) document.getElementById('cantidad').value++
        }else{
            if(document.getElementById('cantidad').value>1) document.getElementById('cantidad').value--
        }
    }

    const correccion = () => {
        if(document.getElementById('cantidad').value>10 || document.getElementById('cantidad').value<1 || isNaN(Number(document.getElementById('cantidad').value)))
            document.getElementById('cantidad').value=1
    }

    const aniadeACarrito = () => {
        if(sessionStorage.getItem('userLoggedIn')===null){
            window.location.replace('/#/account')
        }else{
            const datos = {
                id_articulo: articulo.id,
                cantidad: document.getElementById('cantidad').value
            }
            LineaPedido.makeLinea(datos, toCartCallback)
        }

        function toCartCallback(){
            window.location.replace('/#/cart')
        }
    }
    
    return(
        <>
            <div className="container-fluid py-5 text-left">
                <div className="row px-xl-5">
                    <div className="col-lg-5 pb-5">
                        <img className="w-75" src={foto} alt="Image"></img>
                    </div>
                    <div className="col-lg-7 pb-5">
                        <h3 className="font-weight-semi-bold">{articulo.nombre}</h3>
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                {valoracion}
                            </div>
                            <small className="pt-1">({aleatorio} Valoraciones)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">{articulo.precio} €</h3>
                        <p className="mb-5">{articulo.descripcion}</p>
                        <div className="d-flex align-items-center mb-5 pt-2">
                            <div className="input-group quantity mr-3" style={{width: "130px"}}>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-minus" onClick={() => {modificaCantidad('r')}}>
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                </div>
                                <input type="text" id="cantidad" className="form-control bg-secondary text-center" defaultValue="1" onChange={() => {correccion()}}></input>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-plus" onClick={() => {modificaCantidad('s')}}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                            </div>
                            <button id="btnCarrito" className="btn btn-primary px-3" onClick={() => {aniadeACarrito()}}><span className="mr-1"><FontAwesomeIcon icon={faShoppingCart}/></span>Añadir al carro</button>
                        </div>
                        <div className="d-flex pt-2">
                            <p className="text-dark font-weight-medium mb-0 mr-2">Compartir:</p>
                            <div className="d-inline-flex">
                                <a className="text-dark px-2" href="">
                                    <FontAwesomeIcon icon={faFacebook}/>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <FontAwesomeIcon icon={faLinkedin}/>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <FontAwesomeIcon icon={faPinterest}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>

            <div className="container-fluid py-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Te podría interesar...</span></h2>
                </div>
                <div className="row">
                    {
                    productos.length>0
                    ?
                    <>
                    <Product key={1} id={productos[0].id} nombre={productos[0].nombre} precio={Number(productos[0].precio)} foto={foto} tam={3}/>
                    <Product key={2} id={productos[1].id} nombre={productos[1].nombre} precio={Number(productos[1].precio)} foto={foto} tam={3}/>
                    <Product key={3} id={productos[2].id} nombre={productos[2].nombre} precio={Number(productos[2].precio)} foto={foto} tam={3}/>
                    <Product key={4} id={productos[3].id} nombre={productos[3].nombre} precio={Number(productos[3].precio)} foto={foto} tam={3}/>
                    </>
                    :
                    <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Item