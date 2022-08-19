import  axios from "axios"

export default class UsuariosService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/usuarios/';
         }
    

    getUsers = async () =>{

      console.log("UsersService: Trayendo usuarios...")
       return await axios.get(this.url).then(response=>{
          
        let usuarios=response.data;
        console.log('devolviendo usuarios:')
        console.log(usuarios);
        
          return usuarios;
        }).catch(error =>{
          console.log(error)

        })
    }
    getUser = async (id) =>{
      console.log(`UserService: Trayendo al usuario ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let usuario=response.data;
       console.log('devolviendo usuario:')
       console.log(usuario);
       
         return usuario;
       }).catch(error =>{
         console.log(error)

       })
       
    }

    postUser = async(usuario)=>{
      console.log(`UserService: Creando Usuario`);

      return   await axios.post(this.url,usuario).then(response=>{
        
        let usuarioResponse=response.data;
        console.log('usuario creado con éxito');
        console.log(usuarioResponse);
              return usuarioResponse;
        }).catch(error =>{
          console.log(error)
 
        })
    }

    putUser = async(usuario)=>{
      console.log(`UserService: Modificando al usuario ${usuario.id_Usuario} `) 
      return   await axios.put(this.url+usuario.id_Usuario,usuario).then(response=>{
        
        let usuarioResponse=response.data;
              return usuarioResponse;
        }).catch(error =>{
          console.log(error)
 
        })
    }

    deleteUser = async(usuario)=>{
      console.log(`UserService: Borrando al usuario ${usuario.id_Usuario} `) 
      return   await axios.delete(this.url+usuario.id_Usuario,usuario).then(response=>{
        
        let usuarioResponse=response.data;
              return usuarioResponse;
        }).catch(error =>{
          console.log(error)
 
        })
    }

    loginUser = async(usuario)=>{
      console.log(`UserService: Logenado al usuario ${usuario.username} `) 
      return   await axios.post('https://localhost:7176/api/login/',usuario).then(response=>{
        
        let usuarioResponse=response.data;
        console.log(`Bienvenido ${usuarioResponse.nombre} ${usuarioResponse.apellido}`)
          return usuarioResponse;
        }).catch(error =>{
          console.log(error)
 
        })
    }

}