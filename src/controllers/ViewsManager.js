import ViewsService from "../services/ViewsService"


export default class ViewsManager{ //Class for extra actions 

    constructor(viewsService
        ) {
        this.viewsService = new ViewsService();
         }
    
    getUsuarios = async () => {

    

        let response = await this.viewsService.getUsuarios();
        return response;

    }

 

    getPedidos = async () => {

    
        let response = await this.viewsService.getPedidos();
        return response;

    }

    getPedidosPendientes = async () => {
        let response = await this.viewsService.getPedidosPendientes();

        if(response.length == 0){
            return "Empty"
        }else{
            return response;
        }
    }

    getPedidosPendientesCompletos = async () => {
        let response = await this.viewsService.getPedidosPendientes();
        let pedidosDetallados = [];
        if(response.length == 0){
            return "Empty"
        }else{
            for (let pedido of response){
                pedido.detalles = await this.viewsService.getDetallesPedidoLista(pedido.id_Pedido);
                pedidosDetallados.push(pedido);
                if(pedido.detalles.length !==0){
                    this.getTotal(pedido.detalles);
                }
            }
        }
        return pedidosDetallados;
    }

    getTotal = (detalles) => {
        let sumatoria = 0;
        for (let detalle of detalles){
            sumatoria += parseInt(detalle.precioUnitario)
        }
        return sumatoria;
    }

    getIngredientes = async () => {

        
        let response = await this.viewsService.getIngredientes();
        return response;

    }

    getDetallesPedidos = async () => {

        let response = await this.viewsService.getDetallesPedidos();
        return response;
    }

    getPedidosCompletos = async () => {
        let pedidos = await this.viewsService.getPedidos();
        let pedidosCompletos = [];

        for (let pedido of pedidos){
            try{
            pedido.detalles = await this.viewsService.getDetallesPedidoLista(pedido.Id_pedido);
            pedidosCompletos.push(pedido);
            }
            catch(e){console.log(e)}
        }
        return pedidosCompletos;
    }

    
    getRecetas = async () => {
        let response = await this.viewsService.getRecetas();

        return response;
    }

    getRecetasCompletas = async () => {
        let recetas = await this.viewsService.getRecetas();
        let recetasCompletas = [];
        for (let receta of recetas){
            
            let ingredientes = await this.viewsService.getIngredientesRecetaLista(receta.id_Receta);
            console.log("ingredientes:")
            console.log(ingredientes);
            receta.ingredientes = ingredientes;
            console.log(receta) 

            recetasCompletas.push(receta);
        }
        console.log("Devolviendo recetas en manager")
        console.log(recetasCompletas);
        return recetasCompletas;
    }

}