import { useEffect, useState } from "react";
import UsuariosManager from "../controllers/UsuariosManager";
import {Button,Container,Row,Col, Modal, ModalBody, ModalHeader, ModalFooter, Form} from 'react-bootstrap';
import RolUsuariosManager from "../controllers/RolUsuariosManager";
import './Usuarios.css'
import ViewsManager from "../controllers/ViewsManager";


export default function Usuarios(){


    const [usuarios,setUsuarios]=useState();

    const [usuariosManager]=useState(new UsuariosManager());
    const [rolUsuariosManager]=useState(new RolUsuariosManager())
    const [viewsManager] = useState(new ViewsManager())

    const [usuario,setUsuario]=useState({
      
    });

    const [roles,setRoles]=useState();

//VENTANAS MODAL
    const [modalEdit, setModalEdit] = useState(false);
    const [modalNew, setModalNew] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);


    const cargarVistaUsuarios = async () => {
      
      let vistaUsuarios = await viewsManager.getUsuarios()
      console.log("Mostrando resultado de la vista usuarios")
      console.log(vistaUsuarios) ;

      setUsuarios(vistaUsuarios);

    }


    const crearUsuario = async () => {
        console.log('usuario a crear: ')
        usuario.fechaAlta = new Date().toLocaleString("es-AR").split(',')[0]
        console.log(usuario)
        let response = await usuariosManager.postUser(usuario);
        console.log (response);
        
    }
  
    const editarUsuario = async () => {
      let response = await usuariosManager.putUsuario(usuario);
      
    }
    const traerUsuario = async (idUsuario) =>{
        let usuarioVar;
        usuarioVar = await  usuariosManager.getUsuario(idUsuario)

        console.log('Usuario traído: ')
        console.log(usuarioVar)

        setUsuario(usuarioVar);
        return true;
    }

    const traerRoles = async () => {
        let roles = await rolUsuariosManager.getRoles();
        console.log('roles traidos')
        console.log(roles)
        setRoles(roles);
    }


      useEffect(() => {
          cargarVistaUsuarios();
          //cargarUsuarios();
          traerRoles();
    },[])
    

    const handleChange=e=>{
        const {name,value}=e.target;
        setUsuario({
          ...usuario,
          [name]:value
        });
        console.log(usuario);
      }

      const modalNewHandler = () =>{
          console.log('Cerrando/Abriendo Ventana Crear Usuario')
          setModalNew(!modalNew);
      }

      const modalEditHandler = async (id) => {
        
        if (!modalEdit){
          let response = await traerUsuario(id)
          setModalEdit(!modalEdit);          
        }else{
          setModalEdit(!modalEdit);          
        }

      }
      const modalDeleteHandler = async (id) => {
        
        if (!modalDelete){
          let response = await traerUsuario(id)
          setModalDelete(!modalDelete);          
        }else{
          setModalDelete(!modalDelete);          
        }

      }


      const borrarUsuario = async () =>{
        let response = await usuariosManager.deleteUsuario(usuario);
      }


    return (
      !usuarios?
      <div>
        <h1>Cargando...</h1>
      </div> 
      :
    <Container className="Container">

   
      
        <h1 className="Title">Usuarios</h1>
        <Button onClick={() => modalNewHandler()} className='btn btn-success'>
            Crear Usuario
        </Button>
        <Container className='recetasContainer'>
          { usuarios.map((usuario,i) =>(
                  <Container className='card' key={i}>
                   <Container className='box'>
                     <Container className='content'>
                      <h2>{usuario.nombre} {usuario.apellido}</h2>
                      <h3>{usuario.rol_Descripcion}</h3>
                      <p>Habilitado el: {usuario.fechaAlta}</p>
                      <p>Teléfono: {usuario.nroTelefono}</p>
                      <Button onClick={() => modalEditHandler(usuario.id_Usuario)} className='btn btn-info'>Editar</Button>
                      <Button onClick={() => modalDeleteHandler(usuario.id_Usuario)}  className='btn btn-danger'>Eliminar</Button>
                  </Container>
                </Container>
              </Container>


                  
              )) }
        </Container>

<Modal show={modalNew} onHide={modalNewHandler}>
        <Modal.Header>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={()=>crearUsuario()}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="nombre" type="text" 
              required={true} 
              maxLength={30}
              className="form-control">

              </Form.Control>

            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="apellido" 
              type="text" 
              required={true}  
              maxLength={30}
              className="form-control">
                
              </Form.Control>
            </Form.Group>
        
           <Form.Group>
              <Form.Label >Número de Teléfono</Form.Label> 
              <Form.Control 
              onChange={handleChange} 
              name="nroTelefono" 
              type="number" 
              required={true} 
              maxLength={15} 
              className="form-control">

              </Form.Control>
            </Form.Group>
            {/**
            <Form.Group>
              <Form.Label >Email</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="email" 
              type="email"
              placeholder="ejemplo@gmail.com"
              required={true} 
              maxLength={30} 
              className="form-control">

              </Form.Control>
            </Form.Group>
             */}
            <Form.Group>
              <Form.Label >Nombre de Usuario</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="username" 
              type="text" 
              required={true} 
              maxLength={30}
              className="form-control">

              </Form.Control>
            </Form.Group>
          
            <Form.Group>
              <Form.Label >Contraseña</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="password" 
              type="password" 
              required={true} 
              maxLength={30} 
              className="form-control">

              </Form.Control>
            </Form.Group>
            {!roles? 
            <div>
              <h4>Cargando Roles...</h4>
            </div>:
            <Form.Group>
              <Form.Select onChange={handleChange} name='fk_Id_Rol_Usuario'>
                <option>
                  Selecciona un rol
                </option>
                {roles.map((rol,i) => (
                  <option key={i} value={rol.id_Rol_Usuario}>{rol.descripcion}</option>
                ))}
              </Form.Select>
            </Form.Group>
            }
            <Form.Group className="mt-5 mx-2 d-flex justify-content-end">
             <Button className="btn btn-success" type='submit'
            >
              Crear Usuario
            </Button>
            <Button className="btn mx-4 btn-danger"
            onClick={() => modalNewHandler()}>
              Cancel
            </Button>
            </Form.Group>
          </Form>

        </Modal.Body>
      
      </Modal>

        
<Modal show={modalEdit} onHide={modalEditHandler}>
        <Modal.Header>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={()=>editarUsuario()}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="nombre" type="text" 
              required={true} 
              maxLength={30}
              value={usuario.nombre}
              className="form-control">
              
              </Form.Control>

            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="apellido" 
              value={usuario.apellido}
              type="text" 
              required={true}  
              maxLength={30}
              className="form-control">
                
              </Form.Control>
            </Form.Group>
        
           <Form.Group>
              <Form.Label >Número de Teléfono</Form.Label> 
              <Form.Control 
              onChange={handleChange} 
              name="nroTelefono" 
              value={usuario.nroTelefono}
              type="number" 
              required={true} 
              maxLength={15} 
              className="form-control">

              </Form.Control>
            </Form.Group>{/**
            <Form.Group>
              <Form.Label >Email</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="email" 
              value={usuario.email}
              type="email"
              placeholder="ejemplo@gmail.com"
              required={true} 
              maxLength={30} 
              className="form-control">

              </Form.Control>
            </Form.Group>
             */}
            <Form.Group>
              <Form.Label >Nombre de Usuario</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="username" 
              value={usuario.username}
              type="text" 
              required={true} 
              maxLength={30}
              className="form-control">

              </Form.Control>
            </Form.Group>
          
            <Form.Group>
              <Form.Label >Contraseña</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              name="password" 
              value={usuario.password}
              type="password" 
              required={true} 
              maxLength={30} 
              className="form-control">

              </Form.Control>
            </Form.Group>
            {!roles? 
            <div>
              <h4>Cargando Roles...</h4>
            </div>:
            <Form.Group>
              <Form.Select onChange={handleChange} name='fk_Id_Rol_Usuario'>
                <option>
                  Selecciona un rol
                </option>
                {roles.map((rol,i) => (
                  <option key={i} value={rol.id_Rol_Usuario}>{rol.descripcion}</option>
                ))}
              </Form.Select>
            </Form.Group>
            }
            <Form.Group className="mt-5 mx-2 d-flex justify-content-end">
             <Button className="btn btn-success" type='submit'
            >
              Editar Usuario
            </Button>
            <Button className="btn mx-4 btn-danger"
            onClick={() => modalEditHandler()}>
              Cancel
            </Button>
            </Form.Group>
          </Form>

        </Modal.Body>
      
      </Modal>

      <Modal  show={modalDelete} onHide={modalDeleteHandler}>
        <Modal.Header>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => borrarUsuario()}>
            ¿Está seguro que desea eliminar este usuario? {usuario.nombre} {usuario.apellido} 
            <Form.Group className="mt-5 mx-2 d-flex justify-content-end">
              
              <Button className='btn btn-info' type='submit'>Si, eliminar</Button>
              <Button onClick={() => modalDeleteHandler()} className='mx-4 btn btn-danger'>No</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <ModalFooter>
          
        </ModalFooter>
      </Modal>

    </Container>
   
);

}