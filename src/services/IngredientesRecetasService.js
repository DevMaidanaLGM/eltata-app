import  axios from "axios"

export default class IngredientesRecetasService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/ingredientesRecetas/';
         }
    

    getIngredientesRecetas = async () =>{

      console.log("IngredientesRecetasService: Trayendo ingredientesRecetas...")
       return await axios.get(this.url).then(response=>{
          
        let ingredientesRecetas=response.data;
        console.log('devolviendo ingredientesRecetas:')
        console.log(ingredientesRecetas);
        
          return ingredientesRecetas;
        }).catch(error =>{
          console.log(error)

        })
    }
    getIngredientesReceta = async (id) =>{
      console.log(`IngredientesRecetaService: Trayendo al ingredientesReceta ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let ingredientesReceta=response.data;
       console.log('devolviendo ingredientesReceta:')
       console.log(ingredientesReceta);
       
         return ingredientesReceta;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    getIngredientesRecetaLista = async (id) =>{
      console.log(`IngredientesRecetaService: Trayendo la lista de la receta ${id }}`)
      return await axios.get(this.url+'lista/'+id).then(response=>{
         
       let ingredientesReceta=response.data;
       console.log('devolviendo listaIngredientes:')
       console.log(ingredientesReceta);
       
         return ingredientesReceta;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    postIngredientesReceta = async(ingredientesReceta)=>{
        console.log(`IngredientesRecetaService: Posteando la ingredientesReceta ${ingredientesReceta.normal} `) 
        return   await axios.post(this.url,ingredientesReceta).then(response=>{
          
          let ingredientesRecetaResponse=response.data;
                return ingredientesRecetaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putIngredientesReceta = async(ingredientesReceta)=>{
        console.log(`IngredientesRecetaService: Modificando al ingredientesReceta ${ingredientesReceta.Id_Ingrediente_Receta} `) 
        return   await axios.put(this.url,ingredientesReceta).then(response=>{
          
          let ingredientesRecetaResponse=response.data;
                return ingredientesRecetaResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}