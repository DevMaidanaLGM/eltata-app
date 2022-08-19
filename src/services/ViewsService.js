import  axios from "axios"

export default class ViewsService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/Views/';
         }

    getUsuarios = async () => {

        console.log("Views Services: GetUsuarios")
        return await axios.get(this.url + 'Usuarios').then(response => {
            let usuarios=response.data;
            console.log('devolviendo usuarios:')
            console.log(usuarios);
            
              return usuarios;
        }).catch(error => {console.log(error)})

    }

    getRecetas = async () => {

        console.log("Views Services: GetRecetas")
        return await axios.get(this.url + 'recetas').then(response => {
            let recetas = response.data;
            console.log('devolviendo recetas:')
            console.log(recetas);
            
              return recetas;
        }).catch(error => {console.log(error)})

    }

    getPedidos = async () => {

        console.log("Views Services: GetPedidos")
        return await axios.get(this.url + 'Pedidos').then(response => {
            let pedidos=response.data;
            console.log('devolviendo pedidos:')
            console.log(pedidos);
            
              return pedidos;
        }).catch(error => {console.log(error)})

    }
    getPedidosPendientes = async () => {

        console.log("Views Services: GetPedidos")
        return await axios.get(this.url + 'pedidosPendientes').then(response => {
            let pedidos=response.data;
            console.log('devolviendo pedidos:')
            console.log(pedidos);
            
              return pedidos;
        }).catch(error => {console.log(error)})

    }
    getIngredientes = async () => {

        console.log("Views Services: GetIngredientes")
        return await axios.get(this.url + 'ingredientes').then(response => {
            let ingredientes=response.data;
            console.log('devolviendo ingredientes:')
            console.log(ingredientes);
            
              return ingredientes;
        }).catch(error => {console.log(error)})

    }

    getDetallesPedidoLista = async (id) =>{
        console.log("Views Services: getDetallesPedidoLista")
        return await axios.get(this.url + 'detallesPedidos/lista/'+id).then(response => {
            let detallesPedido = response.data;
            console.log('devolviendo detallesPedido:')
            console.log(detallesPedido);
            
              return detallesPedido;
        }).catch(error => {console.log(error)})
    }

     getDetallesPedidos = async () =>{
        console.log("Views Services: getDetallesPedidos")
        return await axios.get(this.url + 'detallesPedidos').then(response => {
            let detallesPedidos = response.data;
            console.log('devolviendo detallesPedidos:')
            console.log(detallesPedidos);
            
              return detallesPedidos;
        }).catch(error => {console.log(error)})
    }


    getIngredientesRecetaLista = async (id) => {
        console.log("Views Services: getIngredientesRecetaLista")
        return await axios.get(this.url + 'ingredientesRecetas/lista/'+id).then(response => {
            let ingredientesReceta = response.data;
            console.log('devolviendo ingredientes de la Receta:'+id)
            console.log(ingredientesReceta);
            
              return ingredientesReceta;
        }).catch(error => {console.log(error)})
    }

 
}