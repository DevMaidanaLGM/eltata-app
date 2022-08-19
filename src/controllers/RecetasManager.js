import RecetasService from "../services/RecetasService"


export default class RecetasManager{ //Class for extra actions 

    constructor(recetasService
        ) {
        this.recetasService = new RecetasService();
         }
    
    getRecetas =async () => {

    

        return await this.recetasService.getRecetas();

    }
    postReceta = async (receta) => {

        console.log('Recetas Manager: PostReceta')
        let response = await this.recetasService.postReceta(receta);
        
        return response;

    }

    getReceta = async (id) =>{

        let response = await this.recetasService.getReceta(id);
        return response;
    }

    putReceta = async (receta) => {
        let response = await this.recetasService.putReceta(receta);
        return response;
    }
  
    deleteReceta = async (receta) =>{
        let response = await this.recetasService.deleteReceta(receta);
        return response;
    }

    traerRecetasPorSandwich = async (id) => {
        let response = await this.recetasService.getRecetas();
        
        let recetasPorSw = response.filter(receta => receta.fk_Id_Sandwich == id)
        console.log("Manager devolviendo con éxito: ")
        console.log(recetasPorSw)
        return recetasPorSw;
    }
}