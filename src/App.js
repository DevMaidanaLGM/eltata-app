import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Login from './components/Login'
import Recetas from './components/Recetas';
import Pedidos from './components/Pedidos';
import Usuarios from './components/Usuarios';

function App() {
  return (
    <Container className="AppContainer">
      {/* <Login/> */}
      
      <Recetas/>
      <Pedidos/>
      <Usuarios/>
    </Container>
  );
}

export default App;
