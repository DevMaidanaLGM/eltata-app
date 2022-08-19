import { useEffect, useState } from "react";
import RecetasManager from "../controllers/RecetasManager";
import SandwichesManager from "../controllers/SandwichesManager";
import IngredientesManager from "../controllers/IngredientesManager";
import IngredientesRecetasManager from "../controllers/IngredientesRecetasManager"
import {Button, ListGroup,Container,Row,Col, Modal, ModalBody, ModalHeader, ModalFooter, Form} from 'react-bootstrap';
import './Recetas.css'
import ViewsManager from "../controllers/ViewsManager";

export default function Recetas(){

const [recetas,setRecetas]=useState();
const [receta,setReceta]=useState();

const [recetasManager]=useState(new RecetasManager());
const [viewsManager] = useState(new ViewsManager())
const [ingredientesRecetasManager] = useState(new IngredientesRecetasManager())
const [sandwichesManager] = useState(new SandwichesManager());
const [ingredientesManager]= useState(new IngredientesManager());

const [vistaRecetas, setVistaRecetas] = useState();

const [sandwiches, setSandwiches]=useState();
const [detalle, setDetalle] = useState();
const [detalles, setDetalles] = useState([]);
const [ingredientes, setIngredientes] = useState();
const [ingredientesEscasos, setIngredientesEscasos] = useState();


const [modalEdit, setModalEdit] = useState(false);
const [modalNew, setModalNew] = useState(false);
const [modalDelete, setModalDelete] = useState(false);

const crearReceta = async () => {
    console.log('receta a crear: ')
    console.log(receta)
    let response = await recetasManager.postReceta(receta);
    console.log (response);
    return response;
    
}

const editarReceta = async () => {
  let response = await recetasManager.putReceta(receta);
  
}
const traerReceta = async (idReceta) =>{
    let recetaVar;
    recetaVar = await  recetasManager.getReceta(idReceta)

    console.log('Receta traída: ')
    console.log(recetaVar)

    setReceta(recetaVar);
    return true;
}

const traerSandwiches = async () =>{
    let listOfSandwiches = await sandwichesManager.getSandwiches();
    console.log(listOfSandwiches);
    setSandwiches(listOfSandwiches);

}

const traerRecetas = async () =>{
    let listOfRecetas = await recetasManager.getRecetas();
    console.log(listOfRecetas);
    setRecetas(listOfRecetas);
    
}



const handleChange=e=>{
  const {name,value}=e.target;
  setReceta({
    ...receta,
    [name]:value
  });
  console.log(receta);
}

const modalNewHandler = () =>{
    console.log('Cerrando/Abriendo Ventana Crear Receta')
    setModalNew(!modalNew);
}

const modalEditHandler = async (id) => {
  
  if (!modalEdit){
    let response = await traerReceta(id)
    setModalEdit(!modalEdit);          
  }else{
    setModalEdit(!modalEdit);          
  }

}
const modalDeleteHandler = async (id) => {
  
  if (!modalDelete){
    let response = await traerReceta(id)
    setModalDelete(!modalDelete);          
  }else{
    setModalDelete(!modalDelete);          
  }

}


const traerIngredientes = async () =>{
    let response = await ingredientesManager.getIngredientes();
    setIngredientes(response);
    listarEscasos(response);
    
 
}

const agregarDetalle = async () => {


    //let nombreDetalle = ingredientes.find(ingre => ingre.id_Ingrediente==detalle.fk_Id_Ingrediente);
    //detalle.nombre = nombreDetalle.nombre;
    detalle.nombre = nombrarIngrediente(detalle.fk_Id_Ingrediente)
    setDetalles(detallesActuales => [...detallesActuales, detalle]);

    console.log(detalles);
    

}

const nombrarIngrediente = (id) =>{
    let nombreDetalle = ingredientes.find(ingre => ingre.id_Ingrediente==detalle.fk_Id_Ingrediente);
    let result = nombreDetalle.nombre;
    return result

}



const crearDetallesReceta = async () =>{
    let recetaResponse = await crearReceta();
    console.log(recetaResponse);
    let detallesRaw = [];
    detalles.forEach(deta => {
        let detalleRaw = {};
        detalleRaw.fk_Id_Receta = recetaResponse.id_Receta;
        detalleRaw.fk_Id_Ingrediente = deta.fk_Id_Ingrediente;
        detalleRaw.cantidad = deta.cantidad;
        detallesRaw.push(detalleRaw);
    })
    console.log(detallesRaw);
    ingredientesRecetasManager.postListaIngredientesReceta(detallesRaw);
}

const handleChangeIngrediente=e=>{
    const {name,value}=e.target;
    setDetalle({
      ...detalle,
      [name]:value
    });
    console.log(detalle);

}

const borrarReceta = async () =>{
  let response = await recetasManager.deleteReceta(receta);
}

const listarEscasos = (listaIngred) => {
    let escasos = listaIngred.filter(ingre => ingre.cantidad<20);
    console.log(escasos);
    setIngredientesEscasos(escasos)
}

const traerVista = async () => {
  let response = await viewsManager.getRecetasCompletas();
  setVistaRecetas(response);
  
}


const getData = () => {
 /*  traerSandwiches();
  traerIngredientes();
  traerRecetas();
  traerVista(); */
  traerIngredientes();  
  traerVista();
  traerSandwiches();
}

useEffect(() => {
    getData();
    
},[])

    return (
        <Container className="Container">
          <h1 className="Title">Recetas</h1>
            <Button onClick={() => traerSandwiches()}>Traer Sandwiches</Button>
            <Button onClick={() => traerRecetas()}>Traer Recetas</Button>
            <Button onClick={() => traerIngredientes()}>Traer Ingredientes</Button>
            <Button onClick={()=> modalNewHandler()}>Nueva Receta</Button>
    {!ingredientesEscasos? null : 
    <Container className="dangerContainer">
        {ingredientesEscasos.map((esc,i) => (
        <h6 className='danger' key={i}>
            Quedan {esc.cantidad} {esc.nombre}s
        </h6>
        ))}
    </Container>}
{!vistaRecetas?<h4>Cargando Recetas...</h4>:
<Container className='recetasContainer '>
    {vistaRecetas.map((re,i) => (
        <Container className='card' key={i}>
          <Container className='box'>
            <Container className='content'>
            <h2>
            {re.sandwich_Nombre}
                
            </h2>
              <h3>
              {re.receta_Nombre} 
              </h3>
            
              <p>{re.receta_Descripcion}</p>
              {!re.ingredientes? null : 

              <ListGroup variant="flush" className="listaIngredientes">

                {re.ingredientes.map((ingred,i) => (
                                  <ListGroup.Item className='itemIngrediente' key={i}>{ingred.ingrediente_Nombre} ({ingred.ingrediente_Cantidad})</ListGroup.Item>
                                ))}

             
              </ListGroup>
               
              }
              <a onClick={() => modalEditHandler(re.id_Receta)} href="#">Editar Receta</a>

            </Container>
          </Container>
        </Container>
    ))}
</Container>

}


<Modal show={modalNew} onHide={modalNewHandler}>
        <Modal.Header>
          <Modal.Title>Nueva Receta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
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
              <Form.Label>Descripcion</Form.Label>
              <Form.Control 
              onChange={handleChange} 
              as="textarea" rows={2}
              name='descripcion'
              required={true}  
              maxLength={50}
              className="form-control">
                
              </Form.Control>
            </Form.Group>
        
            {!sandwiches? 
            <div>
              <h4>Cargando Sanguchitos...</h4>
            </div>:
            <Form.Group
            >
            <Form.Label>Sandwich</Form.Label>

            <Form.Select 
                onChange={handleChange} 
                name='fk_Id_Sandwich'>
                <option>Seleccione un sandwich</option>
                {sandwiches.map((sandwich,i) => (
                  <option key={i} value={sandwich.id_Sandwich}>{sandwich.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
            }
            <Form.Group
            >
            <h5>Detalles de la receta: </h5>
            </Form.Group>
            {!detalles? null : 
            <Form.Group
            className="form-control">
                
                
                {detalles.map((det,i) => (
                    <h6 key={i}>- {det.nombre} ({det.cantidad})</h6>
                ))}
            </Form.Group>
            }
            <Form.Group>
            {!ingredientes? null : 

                <Form.Select onChange={handleChangeIngrediente} name='fk_Id_Ingrediente'>
                    <option>
                        Seleccione un ingrediente
                    </option>
                    {ingredientes.map((ingre,i) => 
                    <option key={i} value={ingre.id_Ingrediente}>{ingre.nombre}</option>
                    )}
                </Form.Select>
            }

                <Form.Control 
                placeholder="Cantidad" 
                name='cantidad' 
                onChange={handleChangeIngrediente}
                type="number"
                
                >
                
                </Form.Control>
              
                <Button onClick={() => agregarDetalle()}>Agregar</Button>
            </Form.Group>
            <Form.Group className="mt-5 mx-2 d-flex justify-content-end">
             <Button onClick={()=>crearDetallesReceta()} className="btn btn-success"
            >
              Crear Receta
            </Button>
            <Button className="btn mx-4 btn-danger"
            onClick={() => modalNewHandler()}>
              Cancel
            </Button>
            </Form.Group>
          </Form>

        </Modal.Body>
      
      </Modal>

    
        {/**
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
            </Form.Group>
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
      </Modal> */}
        </Container>
    );
}