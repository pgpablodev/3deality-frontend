class LineaPedido{
    constructor(id){
        this.init(id)
    }

    init(id){
        this.articulo = localStorage.getItem('articulo'+id)    
    }

    makeLinea(data, callback){
        localStorage.setItem("articulo"+data.id_articulo, JSON.stringify(data))

        this.init(data.id_articulo)

        callback()
    }
}

export default new LineaPedido()