import  axios from "axios";

export default class RolUsuariosService{ 

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/RolUsuarios/';
         }
    
         getRolUsuarios = async () =>{

            console.log("RolUsuariosService: Trayendo rolUsuarios...")
             return await axios.get(this.url).then(response=>{
                
              let rolUsuarios=response.data;
              console.log('devolviendo rolUsuarios:')
              console.log(rolUsuarios);
              
                return rolUsuarios;
              }).catch(error =>{
                console.log(error)
      
              })
          }
          getRolUsuario = async (id) =>{
            console.log(`RolUsuarioService: Trayendo al rolUsuario ${id }}`)
            return await axios.get(this.url+id).then(response=>{
               
             let rolUsuario=response.data;
             console.log('devolviendo rolUsuario:')
             console.log(rolUsuario);
             
               return rolUsuario;
             }).catch(error =>{
               console.log(error)
      
             })
             
          }

}