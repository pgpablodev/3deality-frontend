import Product from '../Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const endpoint = 'https://pablopovar.tblabs.es/api'

const Shop = () => {
    
    const [articulos, setArticulos] = useState([])
    const [cPrecios, setCPrecios] = useState([])
    const [cImpresoras, setCImpresoras] = useState([])
    const [cAccesorios, setCAccesorios] = useState([])
    const [cMateriales, setCMateriales] = useState([]) 

    const [currentItems, setCurrentItems] = useState([])
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(9)    

    const getArticulos = async () => {
        const response = await axios.get(`${endpoint}/articulos`)
        setArticulos(response.data)
    }

    const buscaArticulos = async (busqueda) => {
        const response = await axios.get(`${endpoint}/search/${busqueda}`)
        setCurrentItems([])
        
        let resultado = []  
        for(let i=0;i<response.data.length;i++)
            resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={"https://pablopovar.tblabs.es"+response.data[i].foto} tam={4}/>)
        
        if(resultado.length<9)
            setCurrentItems(resultado)
        else
            setCurrentItems(resultado.slice(0,9))
    }

    const handleSearch = (busqueda) => {
        if(busqueda===""){
            document.getElementById("nav-btns").style.display = "block"
            getArticulos()
        }else{
            document.getElementById("nav-btns").style.display = "none"             
            buscaArticulos(busqueda)
        }           
    }

    useEffect(() => {
        getArticulos()
        getCPrecios()
        getCImpresoras()
        getCMateriales()
        getCAccesorios()
    }, [])    

    const botonesPagina = []
    
    for(let i=0;i<Math.ceil(articulos.length/9);i++){
        if(i===0)
            botonesPagina.push(<li key={i} className="page-item active mr-2"><button className="page-link">1</button></li>)
        else
            botonesPagina.push(<li key={i} className="page-item mr-2"><button className="page-link">{i+1}</button></li>)
    }

    useEffect(() => {              
        let pageLinks = document.getElementsByClassName("page-link")
        let pageItems = document.getElementsByClassName("page-item")
        for(let i=0;i<pageLinks.length;i++){
            pageLinks[i].addEventListener('click', () => {                
                document.getElementById("name-search").value = ""
                setFrom((Number(pageLinks[i].innerText)-1)*9)
                setTo((Number(pageLinks[i].innerText)-1)*9 + 9)                
                for(let j=0;j<pageItems.length;j++)
                    pageItems[j].classList.remove("active") 
                pageItems[i].classList.add("active")           
            })
        }
        const items = []
        articulos.slice(from,to).map((articulo) => (
            items.push(<Product key={articulo.id} id={articulo.id} nombre={articulo.nombre} precio={articulo.precio} foto={"https://pablopovar.tblabs.es"+articulo.foto} tam={4}/>)
        )) 
        setCurrentItems(items)
    }, [articulos, from, to])

    const getCPrecios = async () => {
        const response = await axios.get(`${endpoint}/cprecios`)
        setCPrecios(response.data)
    }

    const getCImpresoras = async () => {
        const response = await axios.get(`${endpoint}/cimpresoras`)
        setCImpresoras(response.data)
    }

    const getCMateriales = async () => {
        const response = await axios.get(`${endpoint}/cmateriales`)
        setCMateriales(response.data)
    }

    const getCAccesorios = async () => {
        const response = await axios.get(`${endpoint}/caccesorios`)
        setCAccesorios(response.data)
    }

    const [opcionesFiltrado, setOpcionesFiltrado] = useState([0,0,0,0])
    
    const handlePriceFilter = (opcion) => {        
        const opcs = [opcion,opcionesFiltrado[1],opcionesFiltrado[2],opcionesFiltrado[3]]
        setOpcionesFiltrado(opcs) 
        axios.get(`${endpoint}/filter/${opcs[0]}/${opcs[1]}/${opcs[2]}/${opcs[3]}`).then((response) => {
            setCurrentItems([])

            document.getElementById("nav-btns").style.display = "none" 
            
            let resultado = []  
            for(let i=0;i<response.data.length;i++){
                resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={"https://pablopovar.tblabs.es"+response.data[i].foto} tam={4}/>)
            }
            if(response.data.length===0){
                resultado.push(<h2 style={{marginLeft: "15%"}} className="has-error">No se han encontrado artículos para esta selección.</h2>)
            }

            setCurrentItems(resultado)
        })               
    }

    const handleImpreFilter = (opcion) => {
        const opcs = [opcionesFiltrado[0],opcion,opcionesFiltrado[2],opcionesFiltrado[3]]
        if(opcion>0){
            opcs[2] = 0
            opcs[3] = 0
        }
        setOpcionesFiltrado(opcs)
        axios.get(`${endpoint}/filter/${opcs[0]}/${opcs[1]}/${opcs[2]}/${opcs[3]}`).then((response) => {
            setCurrentItems([])

            document.getElementById("nav-btns").style.display = "none" 
            
            let resultado = []  
            for(let i=0;i<response.data.length;i++)
                resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={"https://pablopovar.tblabs.es"+response.data[i].foto} tam={4}/>)
            
            if(response.data.length===0){
                resultado.push(<h2 style={{marginLeft: "15%"}} className="has-error">No se han encontrado artículos para esta selección.</h2>)
            }

            setCurrentItems(resultado)
        })        
    }

    const handleAcceFilter = (opcion) => {
        const opcs = [opcionesFiltrado[0],opcionesFiltrado[1],opcion,opcionesFiltrado[3]]
        if(opcion>0){
            opcs[1] = 0
            opcs[3] = 0
        }
        setOpcionesFiltrado(opcs)      
        axios.get(`${endpoint}/filter/${opcs[0]}/${opcs[1]}/${opcs[2]}/${opcs[3]}`).then(response => {
            setCurrentItems([])

            document.getElementById("nav-btns").style.display = "none"
            
            let resultado = []  
            for(let i=0;i<response.data.length;i++)
                resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={"https://pablopovar.tblabs.es"+response.data[i].foto} tam={4}/>)
            
            if(response.data.length===0){
                resultado.push(<h2 style={{marginLeft: "15%"}} className="has-error">No se han encontrado artículos para esta selección.</h2>)
            }

            setCurrentItems(resultado)
        })    
    }

    const handleMateFilter = (opcion) => {
        const opcs = [opcionesFiltrado[0],opcionesFiltrado[1],opcionesFiltrado[2],opcion]
        if(opcion>0){
            opcs[1] = 0
            opcs[2] = 0
        }
        setOpcionesFiltrado(opcs)
        axios.get(`${endpoint}/filter/${opcs[0]}/${opcs[1]}/${opcs[2]}/${opcs[3]}`).then(response => {
            setCurrentItems([])

            document.getElementById("nav-btns").style.display = "none"
            
            let resultado = []  
            for(let i=0;i<response.data.length;i++)
                resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={"https://pablopovar.tblabs.es"+response.data[i].foto} tam={4}/>)
            
            if(response.data.length===0){
                resultado.push(<h2 style={{marginLeft: "15%"}} className="has-error">No se han encontrado artículos para esta selección.</h2>)
            }

            setCurrentItems(resultado)
        })         
    }

    return(
        <div className="container-fluid pt-5 row">
            <div className="col-lg-3 px-xl-5">
                <div className="col-md-12">
                    <div className="border-bottom mb-4 pb-4">
                        <h4 className="font-weight-semi-bold mb-4 text-left">Filtrar</h4>
                        <h5 className="font-weight-semi-bold mb-4 text-left">Precio</h5>
                        <form onChange={(e) => {handlePriceFilter(e.target.value)}}>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="price-all" name="radio-price"/>
                                    : <input value="0" type="radio" className="form-check-input" defaultChecked id="price-all" name="radio-price"/>
                                }
                                
                                <label className="custom-control-label" htmlFor="price-all">Todos</label>
                                <span className="badge border font-weight-normal">{cPrecios[5]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-1" name="radio-price"/>
                                    : <input value="1" type="radio" className="form-check-input" id="price-1" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-1">0 - 300€</label>
                                <span className="badge border font-weight-normal">{cPrecios[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-2" name="radio-price"/>
                                    : <input value="2" type="radio" className="form-check-input" id="price-2" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-2">300€ - 600€</label>
                                <span className="badge border font-weight-normal">{cPrecios[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-3" name="radio-price"/>
                                    : <input value="3" type="radio" className="form-check-input" id="price-3" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-3">600€ - 900€</label>
                                <span className="badge border font-weight-normal">{cPrecios[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-4" name="radio-price"/>
                                    : <input value="4" type="radio" className="form-check-input" id="price-4" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-4">900€ - 1200€</label>
                                <span className="badge border font-weight-normal">{cPrecios[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cPrecios[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-5" name="radio-price"/>
                                    : <input value="5" type="radio" className="form-check-input" id="price-5" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-5">1200€ - 1500€</label>
                                <span className="badge border font-weight-normal">{cPrecios[4]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Impresoras 3D</h5>
                        <form onChange={(e) => {handleImpreFilter(e.target.value)}}>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="impresoras-all" name="radio-impresora"/>
                                    : <input value="0" type="radio" className="form-check-input" defaultChecked id="impresoras-all" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-all">Todas</label>
                                <span className="badge border font-weight-normal">{cImpresoras[5]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-1" name="radio-impresora"/>
                                    : <input value="1" type="radio" className="form-check-input" id="impresoras-1" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-1">FDM</label>
                                <span className="badge border font-weight-normal">{cImpresoras[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-2" name="radio-impresora"/>
                                    : <input value="2" type="radio" className="form-check-input" id="impresoras-2" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-2">Resina</label>
                                <span className="badge border font-weight-normal">{cImpresoras[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-3" name="radio-impresora"/>
                                    : <input value="3" type="radio" className="form-check-input" id="impresoras-3" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-3">Arcilla</label>
                                <span className="badge border font-weight-normal">{cImpresoras[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-4" name="radio-impresora"/>
                                    : <input value="4" type="radio" className="form-check-input" id="impresoras-4" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-4">Chocolate</label>
                                <span className="badge border font-weight-normal">{cImpresoras[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cImpresoras[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-5" name="radio-impresora"/>
                                    : <input value="5" type="radio" className="form-check-input" id="impresoras-5" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-5">Bioimpresora</label>
                                <span className="badge border font-weight-normal">{cImpresoras[4]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="mb-5">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Accesorios</h5>
                        <form onChange={(e) => {handleAcceFilter(e.target.value)}}>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[6]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="accesorios-all" name="radio-accesorio"/>
                                    : <input value="0" type="radio" className="form-check-input" defaultChecked id="accesorios-all" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-all">Todos</label>
                                <span className="badge border font-weight-normal">{cAccesorios[6]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-1" name="radio-accesorio"/>
                                    : <input value="1" type="radio" className="form-check-input" id="accesorios-1" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-1">Adhesión</label>
                                <span className="badge border font-weight-normal">{cAccesorios[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-2" name="radio-accesorio"/>
                                    : <input value="2" type="radio" className="form-check-input" id="accesorios-2" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-2">Almacenadores</label>
                                <span className="badge border font-weight-normal">{cAccesorios[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-3" name="radio-accesorio"/>
                                    : <input value="3" type="radio" className="form-check-input" id="accesorios-3" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-3">Limpieza</label>
                                <span className="badge border font-weight-normal">{cAccesorios[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-4" name="radio-accesorio"/>
                                    : <input value="4" type="radio" className="form-check-input" id="accesorios-4" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-4">Cubiertas</label>
                                <span className="badge border font-weight-normal">{cAccesorios[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-5" name="radio-accesorio"/>
                                    : <input value="5" type="radio" className="form-check-input" id="accesorios-5" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-5">Herramientas</label>
                                <span className="badge border font-weight-normal">{cAccesorios[4]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cAccesorios[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-6" name="radio-accesorio"/>
                                    : <input value="6" type="radio" className="form-check-input" id="accesorios-6" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-6">Componentes</label>
                                <span className="badge border font-weight-normal">{cAccesorios[5]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="mb-5">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Materiales</h5>
                        <form onChange={(e) => {handleMateFilter(e.target.value)}}>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[3]===0
                                    ? <input defaultChecked disabled={true} type="radio" className="form-check-input" id="materiales-all" name="radio-material"/>
                                    : <input value="0" defaultChecked type="radio" className="form-check-input" id="materiales-all" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-all">Todos</label>
                                <span className="badge border font-weight-normal">{cMateriales[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-1" name="radio-material"/>
                                    : <input value="1" type="radio" className="form-check-input" id="materiales-1" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-1">Filamentos</label>
                                <span className="badge border font-weight-normal">{cMateriales[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-2" name="radio-material"/>
                                    : <input value="2" type="radio" className="form-check-input" id="materiales-2" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-2">Resinas</label>
                                <span className="badge border font-weight-normal">{cMateriales[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-3" name="radio-material"/>
                                    : <input value="3" type="radio" className="form-check-input" id="materiales-3" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-3">Postprocesado</label>
                                <span className="badge border font-weight-normal">{cMateriales[2]}</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Buscar por nombre" id="name-search" onChange={(e) => {handleSearch(e.target.value)}}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary" id="btn-buscar">
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {
                        currentItems
                    }
                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation" id="nav-btns">
                          <ul className="pagination justify-content-center mb-3">
                            {botonesPagina}
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;