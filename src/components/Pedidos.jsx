import { useEffect, useState } from "react";
import PedidosManager from "../controllers/PedidosManager";
import {Button,Container,Row,Col, Modal, ModalBody, ModalHeader, ModalFooter, Form, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Pedidos.css'
import ViewsManager from "../controllers/ViewsManager";
import SandwichesManager from "../controllers/SandwichesManager";
import RecetasManager from "../controllers/RecetasManager";
import DetallesPedidosManager from "../controllers/DetallesPedidosManager";


export default function Pedidos(){


    const [pedidos,setPedidos]= useState();
    const [sandwiches,setSandwiches] = useState();
    const [recetas,setRecetas]= useState();

    const [pedidosManager]=useState(new PedidosManager());
    const [viewsManager] = useState(new ViewsManager());
    const [sandwichesManager] = useState( new SandwichesManager());
    const [recetasManager] = useState( new RecetasManager());
    const [detallesPedidosManager] = useState(new DetallesPedidosManager());
    const [pedido,setPedido]=useState({});

    const [detalle, setDetalle] = useState();
    const [detallesPedidos, setDetallesPedidos] = useState();
    const [detalles, setDetalles] = useState([]);

    const [total,setTotal] = useState(0);

    const [roles,setRoles]=useState();

//VENTANAS MODAL
    const [modalEdit, setModalEdit] = useState(false);
    const [modalNew, setModalNew] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);


    const traerVistaPedidosPendientes = async () => {
      
      let vistaPedidos = await viewsManager.getPedidosPendientesCompletos()
      console.log("Mostrando resultado de la vista pedidos")
      console.log(vistaPedidos) ;

      setPedidos(vistaPedidos);

    }


    const traerSandwiches = async () => {
      let response = await sandwichesManager.getSandwiches();
      setSandwiches(response);

    }
    const traerRecetasPorSandwich = async (id) => {
     
      let response = await recetasManager.traerRecetasPorSandwich(id);

      setRecetas(response);
     
    }

    const crearPedido = async () => {
        console.log('pedido a crear: ')
        pedido.fechaCreacion = new Date().toLocaleString("es-AR").split(',')[0];
        pedido.fk_Id_Usuario = 10;
        pedido.estado = "PENDIENTE";
        console.log(pedido)
        console.log(detalles)
        let response = await pedidosManager.postPedido(pedido);
        console.log (response);
        let responseDetalles = await detallesPedidosManager.postLista(detalles,response);
        console.log (responseDetalles);
        
    }
  
    const editarPedido = async () => {
      let response = await pedidosManager.putPedido(pedido);
      
    }
    const traerPedido = async (idPedido) =>{
        let pedidoVar;
        pedidoVar = await  pedidosManager.getPedido(idPedido)

        console.log('Pedido traído: ')
        console.log(pedidoVar)

        setPedido(pedidoVar);
        return true;
    }


    const agregarDetalle = async () => {

      calcularTotal(detalle.precioUnitario * detalle.cantidad);
      detalle.receta_nombre = nombrarReceta(detalle);
      detalle.sandwich_nombre = nombrarSandwich(detalle);
      setDetalles(detallesActuales => [...detallesActuales, detalle]);
  
      console.log(detalles);
      
     
  }
    
    const calcularTotal = (subTotal) => {
     
      let suma =  total+parseInt(subTotal)
      setTotal(suma);
      

    }

    const getData = () => {

      traerSandwiches();
      traerVistaPedidosPendientes();
      
    }


      useEffect(() => {
          getData()
          //cargarPedidos();
    },[])
    
    const handleChangeDetalle=e=>{
      const {name,value}=e.target;
      setDetalle({
        ...detalle,
        [name]:value
      });

      if(name == "fk_Id_Sandwich"){
        traerRecetasPorSandwich(value);
      }
   
  }
    const handleChange=e=>{
        const {name,value}=e.target;

        console.log([name] + ',' +value)
        setPedido({
          ...pedido,
          [name]:value
        });
      
    
      }

      const modalNewHandler = () =>{
          console.log('Cerrando/Abriendo Ventana Crear Pedido')
          setModalNew(!modalNew);
      }

      const modalEditHandler = async (id) => {
        
        if (!modalEdit){
          let response = await traerPedido(id)
          setModalEdit(!modalEdit);          
        }else{
          setModalEdit(!modalEdit);          
        }

      }
      const modalDeleteHandler = async (id) => {
        
        if (!modalDelete){
          let response = await traerPedido(id)
          setModalDelete(!modalDelete);          
        }else{
          setModalDelete(!modalDelete);          
        }

      }

      const nombrarReceta = (deta) => {
        let response = recetas.find(rec => rec.id_Receta==deta.fk_Id_Receta);
        console.log(response)

        let result = response.nombre;
        return result;
      }

      const nombrarSandwich = (deta) => {
        let response = sandwiches.find(sw => sw.id_Sandwich==deta.fk_Id_Sandwich);
        console.log(response)
        let result = response.nombre;
        return result;
      }

      const borrarPedido = async () =>{
        let response = await pedidosManager.deletePedido(pedido);
      }


    return (
     
    <Container className="Container">

      
        <h1 className="Title">Pedidos</h1>
        <Button onClick={() => modalNewHandler()} className='btn btn-success'>
            Crear Pedido
        </Button>
        <Container className='d-flex justify-content-evenly'>
          { 
            !pedidos ? <h4 className="text-center">Cargando Pedidos...</h4> : 
            <Container>
              {pedidos.map ((ped,i) => (
                <Container className='card' key={i}>
                <Container className='box'>
                  <Container className='content'>
                  <h2 className="danger">
                  {ped.estado}
                      
                  </h2>
                    <h3>
                    {ped.direccion} 
                    </h3>
                    <p>
                      {ped.usuario_Nombre} {ped.usuario_Apellido}
                    </p>
                    <p className="danger">Fecha Límite: {ped.fechaLimite} </p>
                    <p className="danger">Hora Límite: {ped.horaLimite}</p>
                    
                    {!ped.detalles? null : 
      
                    <ListGroup as="ol" numbered variant="flush" className="listaIngredientes">
      
                      {ped.detalles.map((det,i) => (
                                        <ListGroup.Item as="li" className='itemIngrediente' key={i}>
                                          {det.sandwich_Nombre} - {det.receta_Nombre} - ({det.detalle_Cantidad}) <br></br>
                                          Subtotal: {parseInt(det.detalle_PrecioUnitario)* parseInt(det.detalle_Cantidad)} $
                                        </ListGroup.Item>
                                      ))}
      
                   
                    </ListGroup>
                     
                    }
                      <Button onClick={() => modalDeleteHandler(ped.id_Pedido)}  className='btn btn-danger'>Eliminar</Button>
      
                  </Container>
                </Container>
              </Container>
              ))}
            </Container>
          }
              <Modal 
              show={modalNew} 
              onHide={modalNewHandler}
              size="md">
                  <Modal.Header>
                    Nuevo Peiddo
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group
                      className='my-2'>
                        <Form.Label>Fecha Límite</Form.Label>
                        <Form.Control
                         onChange={handleChange} 
                         name="fechaLimite" type="date" 
                         required={true} 
                         maxLength={10}
                         className="form-control">

                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                      className='my-2'>
                        <Form.Label>Hora Limite</Form.Label>
                        <Form.Control
                         onChange={handleChange} 
                         name="horaLimite" type="time" 
                         required={true} 
                         min="00:00" max="23:59"
                         maxLength={5}
                         className="form-control">

                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                      className='my-2'>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                         onChange={handleChange} 
                         name="direccion" type="text" 
                         required={true} 
                         maxLength={50}
                         className="form-control">

                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='text-center'>
                        
                        <h4>Detalles</h4>
                        {!detalles?null:
                         <Form.Group
                          className="form-control">
                            <ListGroup as="ol" numbered>
                              
                             {detalles.map((det,i) => (
                                 <ListGroupItem as="li" key={i}> {det.sandwich_nombre} - {det.receta_nombre} - ({det.cantidad}) <br>
                                 </br>
                                 Subtotal: {det.cantidad * det.precioUnitario}&#36;
                                 </ListGroupItem>
                             ))}

                            </ListGroup>
                         </Form.Group>
                        }
                      <Form.Label>Total a pagar: {total}$</Form.Label>
                      </Form.Group>
                  {!sandwiches? 
                  <div>
                    <h4>Cargando Sanguchitos...</h4>
                  </div>:
                  <Form.Group className='my-2'
                  >
                  <Form.Label>Sandwich</Form.Label>

                  <Form.Select 
                      onChange={handleChangeDetalle} 
                      size="sm"
                      name='fk_Id_Sandwich'>
                      <option>Seleccione un sandwich</option>
                      {sandwiches.map((sandwich,i) => (
                        <option key={i} value={sandwich.id_Sandwich}>{sandwich.nombre}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  }
                  {!recetas? 
                      null :
                      <Form.Group 
                      className='my-2'
                      >
                      <Form.Label>Receta</Form.Label>

                      <Form.Select 
                          onChange={handleChangeDetalle} 
                          size="sm"
                          name='fk_Id_Receta'>
                          <option>Seleccione una receta</option>
                          {recetas.map((receta,i) => (
                            <option key={i} value={receta.id_Receta}>{receta.nombre}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    }
                    <Form.Group 
                    className='my-2'
                    >
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                         onChange={handleChangeDetalle} 
                         name="cantidad" type="number" 
                         required={true} 
                         maxLength={2}
                         className="form-control"
                         size="sm"
                         placeholder="Cantidad de sandwiches"
                         >
                          
                        </Form.Control>
                    </Form.Group>
                  <Form.Group 
                  className='my-2'>
                  <Form.Label>Precio por unidad</Form.Label>
                  <Form.Control
                    onChange={handleChangeDetalle} 
                    name="precioUnitario" type="number" 
                    required={true} 
                    maxLength={5}
                    className="form-control"
                    size="sm"
                    placeholder="Precio Por Unidad"
                    >
                    
                  </Form.Control>
                  </Form.Group>
                  <Button onClick={() => agregarDetalle()}>Agregar</Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => crearPedido()}>
                      Crear
                    </Button>
                  </Modal.Footer>
              </Modal>

              <Modal  show={modalDelete} onHide={modalDeleteHandler}>
                <Modal.Header>
                  <Modal.Title>Eliminar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={() => borrarPedido()}>
                    ¿Está seguro que desea eliminar este pedido? 
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


    </Container>
   
);

}