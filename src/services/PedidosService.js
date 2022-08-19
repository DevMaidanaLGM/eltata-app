import  axios from "axios"

export default class PedidosService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/pedidos/';
         }
    

    getPedidos = async () =>{

      console.log("PedidosService: Trayendo pedidos...")
       return await axios.get(this.url).then(response=>{
          
        let pedidos=response.data;
        console.log('devolviendo pedidos:')
        console.log(pedidos);
        
          return pedidos;
        }).catch(error =>{
          console.log(error)

        })
    }
    getPedido = async (id) =>{
      console.log(`PedidoService: Trayendo al pedido ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let pedido=response.data;
       console.log('devolviendo pedido:')
       console.log(pedido);
       
         return pedido;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    
    postPedido = async(pedido)=>{
        console.log(`PedidoService: posteando pedido`) 
        return   await axios.post(this.url,pedido).then(response=>{
          
          let pedidoResponse=response.data;
                return pedidoResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putPedido = async(pedido)=>{
        console.log(`PedidoService: Modificando al pedido ${pedido.Id_Pedido} `) 
        return   await axios.put(this.url,pedido).then(response=>{
          
          let pedidoResponse=response.data;
                return pedidoResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}