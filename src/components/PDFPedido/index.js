import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import logo from '../../img/logo.png'

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#EDF1FF",
        color: "white",
    },
    cabecera: {
        margin: 10,
        padding: 10,
        color: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    section: {
        margin: 10,
        padding: 10,
        color: "black",
    },
    viewer: {
        width: "100%",
        height: "99.14vh",
    },
    image: {
        width: 225,
        height: 79,
    },
    titulo: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    infoCliente: {
        fontSize: "14px",
        marginTop: "16px",
        border: 1,
        borderStyle: "solid",
        borderColor: "#EDF1FF",
    },
    filaTabla: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        color: "black",
        backgroundColor: "#C8D4FF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",        
    },
    totales: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#C8D4FF",
    }
})

const PDFPedido = () => {

    const endpoint = 'https://pgpablo.helioho.st/api'

    const [pedido, setPedido] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [usuario, setUsuario] = useState({})
    const [loadedUser, setLoadedUser] = useState(false)
    const [articulos, setArticulos] = useState([])
    const [precios, setPrecios] = useState([])
    const [loadedArti, setLoadedArti] = useState(false)
    const [lineasPedido, setLineasPedido] = useState([])

    const id = useParams().id.slice(1,useParams().id.length)

    const getPedido = async () => {
        await axios.get(`${endpoint}/pedido/${id}`).then((response) => {
            setPedido(response.data)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    const getLineasPedido = async () => {
        await axios.get(`${endpoint}/lineaspedido/${id}`).then((response) => {
            setLineasPedido(response.data)
            setLoaded(true)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    const getCliente = async () => {
        await axios.get(`${endpoint}/usuario/${pedido.id_cliente}`).then((response) => {
            setUsuario(response.data)
            setLoadedUser(true)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    const getArticulos = async () => {
        await axios.get(`${endpoint}/articulospedido/${pedido.id}`).then((response) => {
            setArticulos(response.data)
            setLoadedArti(true)           
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    const getPrecios = async () => {
        await axios.get(`${endpoint}/preciospedido/${pedido.id}`).then((response) => {
            setPrecios(response.data)
        }).catch((response) => {
            const error = JSON.stringify(response.response.data.errors)
            console.log(error)       
        })
    }

    useEffect(() => {
        window.location.replace("/#/pdfpedido/:"+id)        
        getPedido()
        getLineasPedido()
    }, [])

    useEffect(() => {        
        if(loaded){
            if(Number(pedido.id_cliente) !== Number(localStorage.getItem("id"))){
                window.location.replace("/")
            }else{
                getCliente()
                getArticulos()
                getPrecios()              
            }
        }
    }, [pedido])
    
    const stringFecha = (fecha) => {
        const anio = fecha.slice(0,4)
        const mes = fecha.slice(5,7)
        const dia = fecha.slice(8,10)
        const hora = fecha.slice(11,13)
        const minuto = fecha.slice(14,16)
        let mesString = ""
        switch(Number(mes)){
            case 1:
                mesString = "enero"
                break
            case 2:
                mesString = "febrero"
                break
            case 3:
                mesString = "marzo"
                break
            case 4:
                mesString = "abril"
                break
            case 5:
                mesString = "mayo"
                break
            case 6:
                mesString = "junio"
                break
            case 7:
                mesString = "julio"
                break
            case 8:
                mesString = "agosto"
                break
            case 9:
                mesString = "septiembre"
                break
            case 10:
                mesString = "octubre"
                break
            case 11:
                mesString = "noviembre"
                break
            case 12:
                mesString = "diciembre"
                break
            default:
                mesString = "mes inválido"
        }

        return `${dia} de ${mesString} de ${anio} - ${Number(hora)+2}:${minuto}`
    }

    return(
        <PDFViewer style={styles.viewer}>
            <Document title={"Pedido"+id}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.cabecera}>
                        <Image style={styles.image} src={logo}></Image>
                        {
                        loaded
                        ?
                        <View style={styles.infoCliente}>
                            <Text>{usuario.nombre+" "+usuario.apellidos}</Text>
                            <Text>{usuario.direccion}</Text>
                            <Text>{usuario.pais+", "+usuario.provincia+", "+usuario.ciudad+", "+usuario.cp}</Text>
                        </View>
                        :
                        <Text>...</Text>
                        }
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.titulo}>Factura</Text>
                        {
                        loaded
                        ?
                        <Text>{stringFecha(pedido.created_at)}</Text>
                        :
                        <Text>...</Text>
                        }
                    </View>
                    {
                    loadedArti
                    ?
                    <View style={styles.section}>
                        <Text style={styles.titulo}>Artículos</Text>
                        {
                        articulos.map((articulo, aIndex) => (                            
                            <View key={aIndex} style={styles.filaTabla}>
                                <Text>{articulo.nombre.length>35 ?  `${articulo.nombre.slice(0,34)}...` : articulo.nombre} - {lineasPedido[aIndex].cantidad} {lineasPedido[aIndex].cantidad===1 ? "unidad" : "unidades"}</Text>
                                <Text>{(Math.round((articulo.precio*lineasPedido[aIndex].cantidad*1.21) * 100) / 100).toFixed(2)} €</Text>
                            </View>                          
                        ))}
                        <View style={styles.totales}>
                            <View style={{padding: 10}}>
                            <Text>Subtotal</Text>
                            <Text>{(Math.round(precios.subtotal*100)/100).toFixed(2)} €</Text>
                            </View>
                            <View style={{padding: 10}}>
                            <Text>Costes de envío</Text>
                            <Text>{(Math.round(precios.envio*100)/100).toFixed(2)} €</Text>
                            </View>
                            <View style={{backgroundColor: "#1b263b", color: "white", padding: 10}}>
                            <Text>Total</Text>
                            <Text>{(Math.round((precios.subtotal+precios.envio)*100)/100).toFixed(2)} €</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <Text>...</Text>
                    }
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default PDFPedido