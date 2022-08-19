import DetallesPedidosService from "../services/DetallesPedidosService"
import StockManager from "./StockManager";

export default class DetallesPedidosManager{ //Class for extra actions 

    constructor(detallesPedidosService,stockManager
        ) {
        this.detallesPedidosService = new DetallesPedidosService();
        this.stockManager = new StockManager();

         }
    
         postLista = async (lista,pedido) => {
            console.log("DetallesPedidosManager PostLista: ")
            this.detallesPedidosService.postDetallesPedido()
            let listaPosteada = [];
            for (let detalle of lista){
                try{
                    console.log("Detalle a subir")
                    
                    detalle.fk_Id_Pedido = pedido.id_Pedido;
                    delete detalle.receta_nombre;
                    delete detalle.sandwich_nombre;
                    console.log(detalle);
                    let detallePosteado = await this.detallesPedidosService.postDetallesPedido(detalle);
                    listaPosteada.push(detallePosteado);
                    this.stockManager.restarDetalleDeStock(detalle);
                }catch(e){
                    console.log(e)
                }
    
            }

            return listaPosteada;
         }

        

         getLista = async (id) => {
            let response = await this.detallesPedidosService.getListaDetallesPedido(id);

            return response;
         }

        

         
        }