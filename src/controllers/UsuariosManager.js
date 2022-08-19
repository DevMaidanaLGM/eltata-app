import UsuariosService from "../services/UsuariosService"


export default class UsuariosManager{ //Class for extra actions 

    constructor(usuariosService
        ) {
        this.usuariosService = new UsuariosService();
         }
    
    getUsers =async () => {

    

        return await this.usuariosService.getUsers();

    }
    postUser = async (usuario) => {

        console.log('Usuarios Manager: PostUser')
        let response = await this.usuariosService.postUser(usuario);
        
        return response;

    }

    getUsuario = async (id) =>{

        let response = await this.usuariosService.getUser(id);
        return response;
    }

    putUsuario = async (usuario) => {
        let response = await this.usuariosService.putUser(usuario);
        return response;
    }
  
    deleteUsuario = async (usuario) =>{
        let response = await this.usuariosService.deleteUser(usuario);
        return response;
    }

    login = async (usuario) =>{
        return await this.usuariosService.loginUser(usuario);
    }
}