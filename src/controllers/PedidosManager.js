/**
 * traer la lista de ingredientes del servicio
 * recibir la lista de detalles o el id de la receta y traer los detalles del servicio
 * modificar la cantidad foreach ingrediente
 */
 import PedidosService from "../services/PedidosService"
 import ViewsService from "../services/ViewsService";
 import DetallesPedidosManager from '../controllers/DetallesPedidosManager';


 export default class PedidosManager{ //Class for extra actions 
 
     constructor(
        pedidosService,detallesPedidosManager
         ) {
         this.pedidosService = new PedidosService();
         this.detallesPedidosManager = new DetallesPedidosManager();

          }
     
     getPedidos =async () => {
 
         
         let response = await this.pedidosService.getPedidos();
 
         return response;
 
     }
     postPedido = async (pedido) => {
 
         console.log('Pedidos Manager: PostPedido');
         console.log(pedido);
         let response = await this.pedidosService.postPedido(pedido);
         
         return response;
 
     }
 
     getPedido = async (id) =>{
 
         let response = await this.pedidosService.getPedido(id);
         return response;
     }
 
     putPedido = async (pedido) => {
         let response = await this.pedidosService.putPedido(pedido);
         return response;
     }
   
     deletePedido = async (pedido) =>{
         let response = await this.pedidosService.deletePedido(pedido);
         return response;
     }
 
     getPedidosCompletos = async () => {

        let listaPedidos = await this.pedidosService.getPedidos();
        let listaCompleta = [];

        for (let pedido of listaPedidos){
            try{
                pedido.detalles = await this.detallesPedidosManager.getLista(pedido.Id_Pedido);
                listaCompleta.push(pedido);
            }catch(e){
                console.log(e)
            }

        }


        return listaCompleta;
     }
     
  
 }