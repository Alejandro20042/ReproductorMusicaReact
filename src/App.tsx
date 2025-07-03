import SideMenu from "./components/SideMenu"
import MainContent from "./components/MainContent"
import './styles/style.css';


function App() {

  return (
     <div className="containerPrincipal">
      <SideMenu />
      <MainContent />
    </div>
  )
}

export default App
