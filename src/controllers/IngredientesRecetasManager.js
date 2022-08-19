import IngredientesRecetasService from "../services/IngredientesRecetasService"
 
export default class IngredientesRecetasManager{ //Class for extra actions 

    constructor(ingredientesRecetasService
        ) {
        this.ingredientesRecetasService = new IngredientesRecetasService();
         }
    
    getIngredientesRecetas =async () => {

    

        return await this.ingredientesRecetasService.getIngredientesRecetas();

    }
    postIngredientesReceta = async (IngredientesReceta) => {

        console.log('IngredientesRecetas Manager: PostIngredientesReceta')
        let response = await this.ingredientesRecetasService.postIngredientesReceta(IngredientesReceta);
        
        return response;

    }

    postListaIngredientesReceta = async (ingredientesReceta) => {
        
            for (let detalle of ingredientesReceta) {
                let response = await this.ingredientesRecetasService.postIngredientesReceta(detalle);
                console.log("Detalle subido con éxito: ")
                console.log(response)
            }
    }
    

    getIngredientesReceta = async (id) =>{

        let response = await this.ingredientesRecetasService.getIngredientesReceta(id);
        return response;
    }

    getIngredientesRecetaLista = async (id) =>{

        let response = await this.ingredientesRecetasService.getIngredientesRecetaLista(id);
        return response;
    }
    putIngredientesReceta = async (IngredientesReceta) => {
        let response = await this.ingredientesRecetasService.putIngredientesReceta(IngredientesReceta);
        return response;
    }
  
    deleteIngredientesReceta = async (IngredientesReceta) =>{
        let response = await this.ingredientesRecetasService.deleteIngredientesReceta(IngredientesReceta);
        return response;
    }

   
}