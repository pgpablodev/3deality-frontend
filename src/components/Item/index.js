import Product from '../Product'
import foto from '../../img/prueba.png' //temporal
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faShoppingCart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'

import axios from 'axios'

const Item = () => {   

    const endpoint = 'http://localhost:8000/api/articulo'
    
    const [articulo, setArticulo] = useState([])
    const [productos, setProductos] = useState([])

    const id = useParams().id.slice(1,2)
    useEffect( () => {
        const getArticuloById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setArticulo(response.data)            
        }
        getArticuloById()
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
                                    <button className="btn btn-primary btn-minus" >
                                    <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                </div>
                                <input type="text" className="form-control bg-secondary text-center" defaultValue="1"></input>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-plus">
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                            </div>
                            <Link className="btn btn-primary px-3" to="/cart"><span className="mr-1"><FontAwesomeIcon icon={faShoppingCart}/></span> Añadir al carro</Link>
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
                    {/*<Product id={productos[0][0]} nombre={productos[0][1]} precio={productos[0][2]} foto={"http://localhost/proyectos/backend-3deality/"+productos[0][7]} tam={3}/>
                    <Product id={productos[1][0]} nombre={productos[1][1]} precio={productos[1][2]} foto={"http://localhost/proyectos/backend-3deality/"+productos[1][7]} tam={3}/>
                    <Product id={productos[2][0]} nombre={productos[2][1]} precio={productos[2][2]} foto={"http://localhost/proyectos/backend-3deality/"+productos[2][7]} tam={3}/>
                    <Product id={productos[3][0]} nombre={productos[3][1]} precio={productos[3][2]} foto={"http://localhost/proyectos/backend-3deality/"+productos[3][7]} tam={3}/>*/}
                </div>
            </div>
        </>
    )
}

export default Item