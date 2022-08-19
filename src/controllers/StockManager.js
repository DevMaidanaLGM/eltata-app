import IngredientesManager from "./IngredientesManager";
import IngredientesRecetasManager from "./IngredientesRecetasManager";


export default class StockManager{ //Class for extra actions 

    constructor(ingredientesRecetasManager, ingredientesManager
        ) {
        this.ingredientesRecetasManager = new IngredientesRecetasManager();
        this.ingredientesManager = new IngredientesManager();
         }


         restarDetalleDeStock = async (detalle) => {

            let ingredientes = await this.ingredientesRecetasManager.getIngredientesRecetaLista(detalle.fk_Id_Receta);
            let ingredientesActualizados = [];
            for (let ingred of ingredientes){
                let response = await this.ingredientesManager.getIngrediente(ingred.fk_Id_Ingrediente);
                response.cantidad -= ingred.cantidad*detalle.cantidad
                response = await this.ingredientesManager.putIngrediente(response);
                ingredientesActualizados.push(response)
            }
            console.log("Ingredientes restados con éxito: ");
            console.log(ingredientesActualizados);
            return ingredientesActualizados;
         }
}