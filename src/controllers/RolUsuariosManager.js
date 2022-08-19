import RolUsuariosService from "../services/RolUsuariosService"


export default class RolUsuariosManager{ //Class for extra actions 

    constructor(rolUsuariosService
        ) {
        this.rolUsuariosService = new RolUsuariosService();
         }
    
    getRoles = async () => {

    
        let response = await this.rolUsuariosService.getRolUsuarios();
        return response;
        

    }
}