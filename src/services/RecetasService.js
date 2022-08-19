import  axios from "axios"

export default class RecetasService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/recetas/';
         }
    

    getRecetas = async () =>{

      console.log("RecetasService: Trayendo recetas...")
       return await axios.get(this.url).then(response=>{
          
        let recetas=response.data;
        console.log('devolviendo recetas:')
        console.log(recetas);
        
          return recetas;
        }).catch(error =>{
          console.log(error)

        })
    }
    getReceta = async (id) =>{
      console.log(`RecetaService: Trayendo al receta ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let receta=response.data;
       console.log('devolviendo receta:')
       console.log(receta);
       
         return receta;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    postReceta = async(receta)=>{
        console.log(`RecetaService: Posteando la receta ${receta.nombre} `) 
        return   await axios.post(this.url,receta).then(response=>{
          
          let recetaResponse=response.data;
                return recetaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putReceta = async(receta)=>{
        console.log(`RecetaService: Modificando al receta ${receta.Id_Receta} `) 
        return   await axios.put(this.url,receta).then(response=>{
          
          let recetaResponse=response.data;
                return recetaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}