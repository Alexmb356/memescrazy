
import './App.css';
import Cookies from './Componentes/Cookies';
import Memes from './Componentes/Memes';
import Navigation from './Componentes/Navigation';
import Footer from "./Componentes/Footer";



function App() {
 

  return (
    <div className='Container'>
      <Navigation/>
      <Cookies/>     
      <Memes/>
      <Footer/>
    
        
    </div>
  )
}

export default App

