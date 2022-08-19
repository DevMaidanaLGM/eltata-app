import  axios from "axios";

export default class IngredientesService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/ingredientes/';
         }
    

    getIngredientes = async () =>{

      console.log("IngredientesService: Trayendo ingredientes...")
       return await axios.get(this.url).then(response=>{
          
        let ingredientes=response.data;
        console.log('devolviendo ingredientes:')
        console.log(ingredientes);
        
          return ingredientes;
        }).catch(error =>{
          console.log(error)

        })
    }
    getIngrediente = async (id) =>{
      console.log(`IngredienteService: Trayendo al ingrediente ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let ingrediente=response.data;
       console.log('devolviendo ingrediente:')
       console.log(ingrediente);
       
         return ingrediente;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    postIngrediente = async(ingrediente)=>{
        console.log(`IngredienteService: Logenado al ingrediente ${ingrediente.Id_Ingrediente} `) 
        return   await axios.post(this.url,ingrediente).then(response=>{
          
          let ingredienteResponse=response.data;
                return ingredienteResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putIngrediente = async(ingrediente)=>{
        console.log(`IngredienteService: Modificando al ingrediente ${ingrediente.id_Ingrediente} `) 
        return   await axios.put(this.url+ingrediente.id_Ingrediente,ingrediente).then(response=>{
          
          let ingredienteResponse=response.data;
                return ingredienteResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}