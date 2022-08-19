import SandwichesService from "../services/SandwichesService"


export default class SandwichesManager{ //Class for extra actions 

    constructor(sandwichesService
        ) {
        this.sandwichesService = new SandwichesService();
         }
    
    getSandwiches =async () => {

        
        let response = await this.sandwichesService.getSandwiches();

        return response;

    }
    postSandwich = async (sandwich) => {

        console.log('Sandwiches Manager: PostSandwich')
        let response = await this.sandwichesService.postSandwich(sandwich);
        
        return response;

    }

    getSandwich = async (id) =>{

        let response = await this.sandwichesService.getSandwich(id);
        return response;
    }

    putSandwich = async (sandwich) => {
        let response = await this.sandwichesService.putSandwich(sandwich);
        return response;
    }
  
    deleteSandwich = async (sandwich) =>{
        let response = await this.sandwichesService.deleteSandwich(sandwich);
        return response;
    }

 
}