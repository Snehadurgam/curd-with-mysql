import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from "./pages/AddEdit";

function App() {
  return (
    <div className="App" >
      <div style={{
        fontFamily: "sans-serif",
        backgroundColor: "#e2e4e4",
        height: "8rem",
        width: "100%",
        paddingTop: "2px"
      }}>
      <h2>Nurse Management</h2>
      <h3>CURD Operation Using Nodejs With MySQL</h3>
      </div>
      <div className="container" style={{marginTop: "-50px"}}>
      <BrowserRouter>
    
    < ToastContainer position='top-center' />
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/addContact" element={<AddEdit />}/>
        <Route exact path="/update/:id" element={<AddEdit />}/>
      </Routes>
 
  </BrowserRouter>
      </div>
  
    </div>
 
  );
}

export default App;
