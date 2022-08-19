import  axios from "axios"

export default class VentasService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/ventas/';
         }
    

    getVentas = async () =>{

      console.log("VentasService: Trayendo ventas...")
       return await axios.get(this.url).then(response=>{
          
        let ventas=response.data;
        console.log('devolviendo ventas:')
        console.log(ventas);
        
          return ventas;
        }).catch(error =>{
          console.log(error)

        })
    }
    getPedido = async (id) =>{
      console.log(`PedidoService: Trayendo al venta ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let venta=response.data;
       console.log('devolviendo venta:')
       console.log(venta);
       
         return venta;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    postPedido = async(venta)=>{
        console.log(`PedidoService: Logenado al venta ${venta.Id_Pedido} `) 
        return   await axios.post(this.url,venta).then(response=>{
          
          let ventaResponse=response.data;
                return ventaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putPedido = async(venta)=>{
        console.log(`PedidoService: Modificando al venta ${venta.Id_Pedido} `) 
        return   await axios.put(this.url,venta).then(response=>{
          
          let ventaResponse=response.data;
                return ventaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}