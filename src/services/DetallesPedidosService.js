import  axios from "axios"

export default class DetallesPedidosService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/detallesPedidos/';
         }
    

    getDetallesPedidos = async () =>{

      console.log("DetallesPedidoService: Trayendo detallesPedidos...")
       return await axios.get(this.url).then(response=>{
          
        let detallesPedido=response.data;
        console.log('devolviendo detallesPedido:')
        console.log(detallesPedido);
        
          return detallesPedido;
        }).catch(error =>{
          console.log(error)

        })
    }

    getListaDetallesPedidos = async (id) => {
      console.log("DetallesPedidoService: Trayendo detallesPedido...")
      return await axios.get(this.url+'lista/'+id).then(response=>{
         
       let detallesPedido=response.data;
       console.log('devolviendo detallesPedido:')
       console.log(detallesPedido);
       
         return detallesPedido;
       }).catch(error =>{
         console.log(error)

       })
    }
    getDetallesPedido = async (id) =>{
      console.log(`DetallesPedidoService: Trayendo al detallesPedido ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let detallesPedido=response.data;
       console.log('devolviendo detallesPedido:')
       console.log(detallesPedido);
       
         return detallesPedido;
       }).catch(error =>{
         console.log(error)

       })
       
    }

    postDetallesPedido = async(detallesPedido)=>{
        console.log(`detallesPedidosService: posteando `) 
        return   await axios.post(this.url,detallesPedido).then(response=>{
          
          let detallesPedidoResponse=response.data;
                return detallesPedidoResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putDetallesPedido = async(detallesPedido)=>{
        console.log(`DetallesPedidoService: Modificando al detallesPedido ${detallesPedido.Id_Detalle_Pedido} `) 
        return   await axios.put(this.url,detallesPedido).then(response=>{
          
          let detallesPedidoResponse=response.data;
                return detallesPedidoResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}