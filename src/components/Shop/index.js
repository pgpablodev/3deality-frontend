import Product from '../Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

import foto from '../../img/prueba.png' //temporal

const endpoint = 'http://localhost:8000/api'

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
            resultado.push(<Product key={response.data[i].id} id={response.data[i].id} nombre={response.data[i].nombre} precio={Number(response.data[i].precio)} foto={foto} tam={4}/>)
        
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
            items.push(<Product key={articulo.id} id={articulo.id} nombre={articulo.nombre} precio={articulo.precio} foto={foto} tam={4}/>)
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

    return(
        <div className="container-fluid pt-5 row">
            <div className="col-lg-3 px-xl-5">
                <div className="col-md-12">
                    <div className="border-bottom mb-4 pb-4">
                        <h4 className="font-weight-semi-bold mb-4 text-left">Filtrar</h4>
                        <h5 className="font-weight-semi-bold mb-4 text-left">Precio</h5>
                        <form>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="price-all" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" defaultChecked id="price-all" name="radio-price"/>
                                }
                                
                                <label className="custom-control-label" htmlFor="price-all">Todos</label>
                                <span className="badge border font-weight-normal">{cPrecios[5]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-1" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" id="price-1" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-1">0 - 300€</label>
                                <span className="badge border font-weight-normal">{cPrecios[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-2" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" id="price-2" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-2">300€ - 600€</label>
                                <span className="badge border font-weight-normal">{cPrecios[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-3" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" id="price-3" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-3">600€ - 900€</label>
                                <span className="badge border font-weight-normal">{cPrecios[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cPrecios[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-4" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" id="price-4" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-4">900€ - 1200€</label>
                                <span className="badge border font-weight-normal">{cPrecios[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cPrecios[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="price-5" name="radio-price"/>
                                    : <input type="radio" className="form-check-input" id="price-5" name="radio-price"/>
                                }                                
                                <label className="custom-control-label" htmlFor="price-5">1200€ - 1500€</label>
                                <span className="badge border font-weight-normal">{cPrecios[4]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Impresoras 3D</h5>
                        <form>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="impresoras-all" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" defaultChecked id="impresoras-all" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-all">Todas</label>
                                <span className="badge border font-weight-normal">{cImpresoras[5]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-1" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" id="impresoras-1" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-1">FDM</label>
                                <span className="badge border font-weight-normal">{cImpresoras[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-2" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" id="impresoras-2" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-2">Resina</label>
                                <span className="badge border font-weight-normal">{cImpresoras[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-3" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" id="impresoras-3" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-3">Arcilla</label>
                                <span className="badge border font-weight-normal">{cImpresoras[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cImpresoras[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-4" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" id="impresoras-4" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-4">Chocolate</label>
                                <span className="badge border font-weight-normal">{cImpresoras[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cImpresoras[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="impresoras-5" name="radio-impresora"/>
                                    : <input type="radio" className="form-check-input" id="impresoras-5" name="radio-impresora"/>
                                }
                                <label className="custom-control-label" htmlFor="impresoras-5">Bioimpresora</label>
                                <span className="badge border font-weight-normal">{cImpresoras[4]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="mb-5">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Accesorios</h5>
                        <form>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[6]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" defaultChecked id="accesorios-all" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" defaultChecked id="accesorios-all" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-all">Todos</label>
                                <span className="badge border font-weight-normal">{cAccesorios[6]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-1" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-1" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-1">Adhesión</label>
                                <span className="badge border font-weight-normal">{cAccesorios[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-2" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-2" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-2">Almacenadores</label>
                                <span className="badge border font-weight-normal">{cAccesorios[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-3" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-3" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-3">Limpieza</label>
                                <span className="badge border font-weight-normal">{cAccesorios[2]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[3]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-4" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-4" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-4">Cubiertas</label>
                                <span className="badge border font-weight-normal">{cAccesorios[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cAccesorios[4]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-5" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-5" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-5">Herramientas</label>
                                <span className="badge border font-weight-normal">{cAccesorios[4]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between">
                                {
                                    cAccesorios[5]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="accesorios-6" name="radio-accesorio"/>
                                    : <input type="radio" className="form-check-input" id="accesorios-6" name="radio-accesorio"/>
                                }
                                <label className="custom-control-label" htmlFor="accesorios-6">Componentes</label>
                                <span className="badge border font-weight-normal">{cAccesorios[5]}</span>
                            </div>
                        </form>
                    </div>
                    <div className="mb-5">
                        <h5 className="font-weight-semi-bold mb-4 text-left">Materiales</h5>
                        <form>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[3]===0
                                    ? <input defaultChecked disabled={true} type="radio" className="form-check-input" id="materiales-all" name="radio-material"/>
                                    : <input defaultChecked type="radio" className="form-check-input" id="materiales-all" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-all">Todos</label>
                                <span className="badge border font-weight-normal">{cMateriales[3]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[0]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-1" name="radio-material"/>
                                    : <input type="radio" className="form-check-input" id="materiales-1" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-1">Filamentos</label>
                                <span className="badge border font-weight-normal">{cMateriales[0]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[1]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-2" name="radio-material"/>
                                    : <input type="radio" className="form-check-input" id="materiales-2" name="radio-material"/>
                                }
                                <label className="custom-control-label" htmlFor="materiales-2">Resinas</label>
                                <span className="badge border font-weight-normal">{cMateriales[1]}</span>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                {
                                    cMateriales[2]===0
                                    ? <input disabled={true} type="radio" className="form-check-input" id="materiales-3" name="radio-material"/>
                                    : <input type="radio" className="form-check-input" id="materiales-3" name="radio-material"/>
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
                            <div>
                                <button className="btn border dropdown-toggle" type="button" onClick={() => {
                                    const desplegable = document.getElementById("triggerId")
                                    if(desplegable.classList.contains("show")){
                                        desplegable.classList.remove("show")
                                    }else{
                                        desplegable.classList.add("show")
                                        desplegable.classList.add("mr-3")
                                        desplegable.style.top = "30px"
                                    }
                                }} >
                                    Ordenar
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" id="triggerId">
                                    <div className="dropdown-item">Más recientes</div>
                                    <div className="dropdown-item">Mejor valorados</div>
                                </div>
                            </div>
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

/*useEffect(() => {
        getArticulos()
        if(state!==null){
            handleSearch(state.busqueda)
        }
    })

    const getArticulos = async () => {
        const response = await axios.get(`${endpoint}/articulos`)
        setArticulos(response.data)
    }

    useEffect(() => {
        fetch("http://localhost/proyectos/backend-3deality/contadoresPrecios.php")
            .then((response) => {
                return response.json()
            })
            .then((cPrecios) => {
                setCPrecios(cPrecios)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost/proyectos/backend-3deality/contadoresImpresoras.php")
            .then((response) => {
                return response.json()
            })
            .then((cImpresoras) => {
                setCImpresoras(cImpresoras)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost/proyectos/backend-3deality/contadoresAccesorios.php")
            .then((response) => {
                return response.json()
            })
            .then((cAccesorios) => {
                setCAccesorios(cAccesorios)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost/proyectos/backend-3deality/contadoresMateriales.php")
            .then((response) => {
                return response.json()
            })
            .then((cMateriales) => {
                setCMateriales(cMateriales)
            })
    }, [])

    const handleSearch = (busqueda) => {
        if(busqueda==="")
            document.getElementById("nav-btns").style.display = "block"
        else
            document.getElementById("nav-btns").style.display = "none"
        let resultado = []        

        fetch("http://localhost/proyectos/backend-3deality/buscaArticulos.php?search="+busqueda)
            .then((response) => {
                return response.json()
            })
            .then((articulos) => {
                setCurrentItems([])
                for(let i=0;i<articulos.length;i++)
                    resultado.push(<Product key={articulos[i].id} id={articulos[i].id} nombre={articulos[i].nombre} precio={Number(articulos[i].precio)} foto={foto} tam={4}/>)
                if(resultado.length<9)
                    setCurrentItems(resultado)
                else
                    setCurrentItems(resultado.slice(0,9))
            })
    }

    const items = []
    
    for(let i=0;i<articulos.length;i++)
        items.push(<Product key={articulos[i][0]} id={articulos[i][0]} nombre={articulos[i][1]} precio={Number(articulos[i][2])} foto={"http://localhost/proyectos/backend-3deality/"+articulos[i][7]} tam={4}/>)
    
    const botonesPagina = []
    
    for(let i=0;i<Math.ceil(cPrecios[5]/9);i++){
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
                let desde = (Number(pageLinks[i].innerText)-1)*9
                let hasta = desde + 9
                let anadir = []
                for(let q=desde;q<hasta;q++){
                    anadir.push(items[q])
                }
                setCurrentItems(anadir)
                for(let j=0;j<pageItems.length;j++)
                    pageItems[j].classList.remove("active") 
                pageItems[i].classList.add("active")            
            })
        } 
    }, [items])

    const handleSort = (sort) => {
        fetch("http://localhost/proyectos/backend-3deality/ordenaArticulos.php?sort=" +sort)
            .then((response) => {
                return response.json()
            })
            .then((articulos) => {
                while(items.length>0) items.pop()
                for(let i=0;i<articulos.length;i++)
                    items.push(<Product key={articulos[i][0]} id={articulos[i][0]} nombre={articulos[i][1]} precio={Number(articulos[i][2])} foto={"http://localhost/proyectos/backend-3deality/"+articulos[i][7]} tam={4}/>)
                const current = []
                for(let i=0;i<items.length;i++){
                    current.push(items[i])
                }
                setCurrentItems(current)
                document.getElementById("nav-btns").style.display = "none"
                document.getElementById("triggerId").classList.remove("show")
            })
    }

    const handlePriceFilter = (min, max, all) => {
        
        if(all) toggleSelectores("precios")
        
        fetch("http://localhost/proyectos/backend-3deality/filtraPrecios.php?min=" +min +"&max=" +max)
            .then((response) => {
                return response.json()
            })
            .then((articulos) => {
                while(items.length>0) items.pop()
                for(let i=0;i<articulos.length;i++)
                    items.push(<Product key={articulos[i][0]} id={articulos[i][0]} nombre={articulos[i][1]} precio={Number(articulos[i][2])} foto={"http://localhost/proyectos/backend-3deality/"+articulos[i][7]} tam={4}/>)
                const current = []
                for(let i=0;i<items.length;i++){
                    current.push(items[i])
                }
                setCurrentItems(current)
                document.getElementById("nav-btns").style.display = "none"
                document.getElementById("triggerId").classList.remove("show")
            })
    }

    const handleFilter = (categoria, tipo, all) => {

        if(all) toggleSelectores(categoria)

        fetch("http://localhost/proyectos/backend-3deality/filtra" +categoria +".php?tipo=" +tipo)
            .then((response) => {
                return response.json()
            })
            .then((articulos) => {
                while(items.length>0) items.pop()
                for(let i=0;i<articulos.length;i++)
                    items.push(<Product key={articulos[i][0]} id={articulos[i][0]} nombre={articulos[i][1]} precio={Number(articulos[i][2])} foto={"http://localhost/proyectos/backend-3deality/"+articulos[i][7]} tam={4}/>)
                const current = []
                for(let i=0;i<items.length;i++){
                    current.push(items[i])
                }
                setCurrentItems(current)
                document.getElementById("nav-btns").style.display = "none"
                document.getElementById("triggerId").classList.remove("show")
            })
    }*/

    /*
    const botonesPagina = []
    
    for(let i=0;i<Math.ceil(cPrecios[5]/9);i++){
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
                let desde = (Number(pageLinks[i].innerText)-1)*9
                let hasta = desde + 9
                let anadir = []
                for(let q=desde;q<hasta;q++){
                    anadir.push(items[q])
                }
                setCurrentItems(anadir)
                for(let j=0;j<pageItems.length;j++)
                    pageItems[j].classList.remove("active") 
                pageItems[i].classList.add("active")            
            })
        } 
    }, [items])
    */