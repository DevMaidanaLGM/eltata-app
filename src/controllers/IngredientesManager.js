import IngredientesService from "../services/IngredientesService"
 
export default class IngredientesManager{ //Class for extra actions 

    constructor(ingredientesService
        ) {
        this.ingredientesService = new IngredientesService();
         }
    
    getIngredientes = async () => {

    
      

        return  await this.ingredientesService.getIngredientes();
    }
    postIngrediente = async (ingrediente) => {

        console.log('Ingredientes Manager: PostIngrediente')
        let response = await this.ingredientesService.postIngrediente(ingrediente);
        
        return response;

    }

    getIngrediente = async (id) =>{

        let response = await this.ingredientesService.getIngrediente(id);
        return response;
    }

    putIngrediente = async (ingrediente) => {
        let response = await this.ingredientesService.putIngrediente(ingrediente);
        return response;
    }
  
    deleteIngrediente = async (ingrediente) =>{
        let response = await this.ingredientesService.deleteIngrediente(ingrediente);
        return response;
    }

   
}