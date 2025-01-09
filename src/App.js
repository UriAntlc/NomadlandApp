import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import Registro from "./views/Registro";
import InicioSesion from "./views/InicioSesion";
import Experiencias from "./views/Experiencias";
import Modificar from "./views/ModificarPerfil";
import ArmarPlan from "./views/ArmarPlan";
import VerPlan from "./views/VerPlan";
/*import VerPlan from "./views/VerPlan";*/
import Actividad from "./views/Actividad";
import Explora from "./views/Explora";
import GustosPerfil from "./views/GustosPerfil";
import ModGustos from "./views/ModGustosPerfil";
import ListaActividad from "./componentes/listaactividad"; // Importa ListaActividad
import Categoria from "./componentes/Categoria"; // Importa el componente Categoria
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verificacion from "./componentes/Verificacion";
import CompletarPerfil from "./views/CompletarPerfil";
import LugaresCarrusel from "./views/LugaresCarrusel";
import Verificar from "./views/Verificar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RevisarPlan from "./views/RevisarPlan";
import MetaLogin from "./componentes/MetaLogin";
import ModPerfil from "./componentes/ModPerfil";
import VistaLugares from "./views/VistaLugares";
import Olvido from "./componentes/Olvido";
import InfoPass from "./componentes/InfoPass";
import NotFound from "./views/NotFound";
import DetalleLugarC from "./componentes/DetalleLugarC";
import DetalleLugar from "./views/DetalleLugar";
import { AuthProvider } from "./context/auth";
import CarrouselLugares from "./componentes/CarrouselLugares";
import Ruta from "./views/Ruta"
import Busqueda from "./componentes/BusquedaLugares"
import CalcularRuta from "./componentes/calcularRuta"
import PerfilPlan from "./views/PerfilPlan";
import { SearchProvider } from "./context/searchContext";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SearchProvider>
      <Router>
        <BarraNav />
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioSesion" element={<InicioSesion />} />
          <Route path="/ArmarPlan" element={<ArmarPlan />} />
          <Route path="/Actividad/" element={<Actividad />} />
          <Route path="/Experiencias" element={<Experiencias />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Completar" element={<CompletarPerfil />} />
          <Route path="/Modificar" element={<Modificar />} />
          <Route path="/Explora" element={<Explora />} />
          <Route path="/LugaresCarrusel" element={<LugaresCarrusel />} />
          <Route path="/Verificar" element={<Verificar />} />
          <Route path="/GustosPerfil" element={<GustosPerfil />} />
          <Route path="/ModGustos" element={<ModGustos />} />
          <Route path="/MetaLogin" element={<MetaLogin />} />
          <Route path="/ModPerfil" element={<ModPerfil />} />
          <Route path="/Actividades" element={<ListaActividad />} /> {/* Ruta para ListaActividad */}
          <Route path="/Categoria" element={<Categoria />} /> {/* Ruta para Categoria */}
          <Route path="/vista-lugares/:categoria" element={<VistaLugares />} />
          <Route path="/Olvido" element={<Olvido />} />
          <Route path="/InfoPass" element={<InfoPass />} />
          <Route path="/DetalleLugarC" element={<DetalleLugarC />} />
          <Route path="/lugares/:titulo" element={<DetalleLugar />} />
          <Route path="/VerPlan" element={<VerPlan />} />
          <Route path="/Busqueda" element={<Busqueda />} />
          <Route path="/Ruta" element={<calcularRuta />} />
          <Route path="/PerfilPlan" element={<PerfilPlan />} />

          {/* Rutas protegidas para verificacion */}
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/Ruta" element={<Ruta/>}/>
          <Route path="/registro" element={<Registro />} />
          <Route path="/RevisarPlan" element={<RevisarPlan />} />

          {/* Rutas protegidas */}
          <Route element={<Verificacion />}>
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Modificar" element={<Modificar />} />
            <Route path="/Completar" element={<CompletarPerfil />} />
          </Route>
          {/* Ruta de inicio */}
          <Route path="/" element={<Inicio />} />
          {/* Ruta NotFound */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
      </SearchProvider>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;