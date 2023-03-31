class Pedido {
    constructor(){
        this.init()
    }

    init(){
        this.idCliente = localStorage.getItem('idCliente')
    }

    makePedido(data, callback) {
        localStorage.setItem('idCliente', data.id_cliente)

        this.init()

        callback()
    }

    //Una vez se crea el pedido, borraremos las líneas del pedido del
    //almacenamiento de sesión
    pedidoCreado(callback){
        //desarrollar más tarde
    }
}

export default new Pedido()