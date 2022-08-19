import { useEffect, useState } from "react";
import UsuariosManager from "../controllers/UsuariosManager";
import Usuarios from "./Usuarios";
import Recetas from"./Recetas";

export default function Login(){


    const [usuarios,setUsuarios]=useState([]);

    const [usuariosManager,setUsuariosManager]=useState(new UsuariosManager());

    const [usuario,setUsuario]=useState({username:'',password:''});

  

    const login = async () =>{
        let usuarioVar;
        usuarioVar = await  usuariosManager.login(usuario)

        console.log(usuarioVar)

        setUsuario(usuarioVar);
        
    }

    const handleChange=e=>{
        const {name,value}=e.target;
        setUsuario({
          ...usuario,
          [name]:value
        });
        console.log(usuario);
      }

    useEffect(() => {
      },[])
      

    return(
        <>
        <div>
            <h1>
            Hola Mundo!
            
       
            </h1>

            <input onChange={handleChange} name='username'>

            </input>
            <input onChange={handleChange} name='password'>
            </input>
            <button onClick={() => login()}>login

            </button>
            
            <h2>
                {usuario.nombre}
            </h2>
          </div>
          <Usuarios/>
          <Recetas/>
        </>
    );

}