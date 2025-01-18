import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const Checkout = () => {

    const [articulos, setArticulos] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [envio, setEnvio] = useState(0)
    const [usuario, setUsuario] = useState({})

    const endpoint = 'https://pablopovar.tblabs.es/api'

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

        await axios.get(`${endpoint}/lista/${JSON.stringify(idsArticulo)}`).then((response) => {
            if(articulos.length===0) setArticulos(response.data)
        })  
    }

    const getInfoDireccion = async () => {
        await axios.get(`${endpoint}/usuario/${localStorage.getItem('id')}`).then((response) => {
            setUsuario(response.data)
        }) 
    }

    const sendEmail = async (id) => {
        await axios.get(`${endpoint}/email/${id}`).then((response) => {})
    }

    useEffect(() => {
        getArticulosLista()
        getInfoDireccion()

        let suma = 0
        for(let i=0; i<articulos.length; i++){
            suma += articulos[i].precio*cantidades[i]*1.21
        }

        setSubtotal((Math.round((suma) * 100) / 100).toFixed(2))
        setEnvio((Math.round((subtotal*0.05) * 100) / 100).toFixed(2))
    }, [articulos])

    const realizaPedido = async () => {
        //Ponemos este texto dentro del botón de realización de pedido, para que el usuario sepa
        //que se está realizando el proceso.
        document.getElementById("btnPedido").innerText = "..."

        //Recojo todos los valores del pseudoformulario
        const nombre = document.getElementById("nombre").value
        const apellidos = document.getElementById("apellidos").value
        const email = document.getElementById("email").value
        const telefono = document.getElementById("telefono").value
        const direccion = document.getElementById("direccion").value
        const pais = document.getElementById("pais").value
        const ciudad = document.getElementById("ciudad").value
        const provincia = document.getElementById("provincia").value
        const cp = document.getElementById("cp").value
        
        //Condicional de validación
        if(nombre==="" || apellidos==="" || email==="" || telefono==="" || direccion==="" || pais==="" || ciudad==="" || provincia==="" || cp===""){
            //No permitimos realizar pedido si alguno de estos campos está vacío
            const { value: camposVacios } = await Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Debe rellenar todos los campos</i>",
                confirmButtonText: 'Entendido',
                icon: 'warning'
            })
            if(camposVacios){
                document.getElementById("btnPedido").innerText = "Realizar pedido"
                window.location.replace('/#/checkout')
            }
        }else{
            //Si los campos no están vacíos, podemos hacer lo demás

            //Variable en la que se comprueba si se ha realizado algun cambio respecto
            //a la información de envío almacenada en BD
            const noHayCambio = nombre===usuario.nombre && apellidos===usuario.apellidos
                                && email===usuario.email && telefono===usuario.telefono
                                && direccion===usuario.direccion && pais===usuario.pais
                                && ciudad===usuario.ciudad && provincia===usuario.provincia
                                && cp===usuario.cp

            //Creo un objeto formData para enviar
            var formData = new FormData()
            formData.append("nombre", nombre)
            formData.append("apellidos", apellidos)
            formData.append("email", email)
            formData.append("telefono", telefono)
            formData.append("direccion", direccion)
            formData.append("pais", pais)
            formData.append("ciudad", ciudad)
            formData.append("provincia", provincia)        
            formData.append("cp", cp)
            formData.append("_method", "put")

            //Si ha habido un cambio, hay que modificar la información en BD
            if(!noHayCambio){
                await axios.post(`${endpoint}/usuario/${localStorage.getItem("id")}`, formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                }).catch((error) => {
                    console.log(error.response.data)
                })
            }

            //Creamos el registro de pedido en BD
            await axios.post(endpoint+"/pedido", {id_cliente: localStorage.getItem("id")},
            {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            }).catch((error) => {
                console.log(error.response.data)
            })

            //Recogemos el pedido recién creado (es decir, el último asociado a ese cliente) para tener su id de BD
            let idPedido = 0

            await axios.get(`${endpoint}/pedidoporcliente/${localStorage.getItem('id')}`).then((response) => {
                idPedido = response.data.id
            }).catch((error) => {
                console.log(error.response.data)
            })

            //Por cada línea de pedido almacenada en Local Storage creamos un registro en BD. Utilizamos la id de
            //pedido recogida en el paso anterior
            const keys = Object.keys({...localStorage})
            const listaCompra = Object.values({...localStorage})

            for(let i=0;i<listaCompra.length;i++){
                if(keys[i]!=='userEmail' && keys[i]!=='userName' && keys[i]!=='userLoggedIn' && keys[i]!=='id'){
                    await axios.post(endpoint+"/lineapedido", {id_pedido: idPedido, id_articulo: JSON.parse(listaCompra[i]).id_articulo, cantidad: JSON.parse(listaCompra[i]).cantidad},
                    {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    }).catch((error) => {
                        console.log(error.response.data)
                    })
                }
            }

            //Salvamos la información de sesión de localStorage
            let sessionId = localStorage.getItem('id')
            let userName = localStorage.getItem('userName')
            let userEmail = localStorage.getItem('userEmail')
            let userLoggedIn = localStorage.getItem('userLoggedIn')
            
            //Vacíamos el almacenamiento local para quitarnos las líneas del pedido
            localStorage.clear()

            //Reinsertamos la información de sesión en localStorage
            localStorage.setItem('id', sessionId)
            localStorage.setItem('userName',userName)
            localStorage.setItem('userEmail',userEmail)
            localStorage.setItem('userLoggedIn',userLoggedIn)

            //Enviamos correo electrónico
            sendEmail(idPedido)
            
            //Notificamos al usuario de que todo ha funcionado correctamente
            const { value: fin } = await Swal.fire({
                title: "<strong>Pedido realizado</strong>",
                html: "<i>A continuación podrá descargar su factura</i>",
                confirmButtonText: 'Continuar',
                icon: 'success'
            })

            //Finalmente, toca redirigir a la pantalla de confirmación
            if(fin) window.location.replace('/#/account')
        }
    }

    if(localStorage.getItem('userLoggedIn')===null){
        window.location.replace('/#/account')
    }else{
        return(
            <div className="container-fluid pt-5 text-left">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">Dirección</h4>
                            <div className="row">
                                <div className="col-md-6 form-group">                                    
                                    <label htmlFor="nombre">Nombre</label>
                                    <input id="nombre" name="nombre" className="form-control" type="text" defaultValue={usuario.nombre}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input id="apellidos" name="apellidos" className="form-control" type="text" defaultValue={usuario.apellidos}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input id="email" name="email" className="form-control" type="text" defaultValue={usuario.email}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="telefono">Núm. Teléfono</label>
                                    <input id="telefono" name="telefono" className="form-control" type="text" defaultValue={usuario.telefono}></input>
                                </div>
                                <div className="col-md-12 form-group">
                                    <label htmlFor="direccion">Dirección</label>
                                    <input id="direccion" name="direccion" className="form-control" type="text" defaultValue={usuario.direccion}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="pais">País</label>
                                    <input id="pais" name="pais" readOnly className="form-control" type="text" value={usuario.pais}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="ciudad">Ciudad</label>
                                    <input id="ciudad" name="ciudad" className="form-control" type="text" defaultValue={usuario.ciudad}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="provincia">Provincia</label>
                                    <input id="provincia" name="provincia" className="form-control" type="text" defaultValue={usuario.provincia}></input>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label htmlFor="cp">Código postal</label>
                                    <input id="cp" name="cp" className="form-control" type="text" defaultValue={usuario.cp}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Total del pedido</h4>
                            </div>
                            <div className="card-body">                                
                                <h5 className="font-weight-medium mb-3">Productos</h5>                                
                                {articulos.map((articulo, articuloIndex) => (
                                    <div key={articuloIndex} className="d-flex justify-content-between">
                                        <p>{articulo.nombre} (x{cantidades[articuloIndex]})</p>
                                        <p>{(Math.round(articulo.precio*1.21 * 100) / 100).toFixed(2)} €</p>
                                    </div>
                                ))}
                                <hr className="mt-0"></hr>
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{subtotal} €</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Envío</h6>
                                    <h6 className="font-weight-medium">{envio} €</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">{(Math.round((Number(subtotal) + Number(envio)) * 100) / 100).toFixed(2)} €</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Pago</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" name="payment" id="paypal"></input>
                                        <label className="custom-control-label" htmlFor="paypal">&emsp;PayPal</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" name="payment" id="creditcard"></input>
                                        <label className="custom-control-label" htmlFor="creditcard">&emsp;Tarjeta de crédito</label>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" name="payment" id="banktransfer"></input>
                                        <label className="custom-control-label" htmlFor="banktransfer">&emsp;Transferencia bancaria</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                {
                                localStorage.length!==0
                                ?
                                <button onClick={() => {realizaPedido()}} id="btnPedido" className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Realizar pedido</button>
                                :
                                <h4 className="text-center">No se ha añadido nada al carrito</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout