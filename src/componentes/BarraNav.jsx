import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { logoNomadas } from "../imgs/ArchivoImgs";
import "../estilos/estiloBarraNav.css";
import axios from "axios";
import { AuthContext } from "../context/auth";

const BarraNav = () => {
  const { user, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        if (response.data) {
          login(response.data); // Guardar usuario autenticado
        }
      } catch (error) {
        logout(); // Si ocurre un error, se desloguea
      }
    };
    verificarUsuario();
  }, [login, logout]);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/Inicio">
          <img src={logoNomadas} alt="Logo de la página" />
        </Link>
        <Link to="/Inicio">
          <h1>NómadasAPP</h1>
        </Link>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link className="normal" to="/ArmarPlan">
              Arma tu plan
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Explora">
              Explora
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/RevisarPlan">
              Ver mi plan
            </Link>
          </li>
            {/* Condición para ocultar el enlace "Cerrar sesión" */}
            {user ? null : (
            <li>
              <Link className="botonAccion" to="/InicioSesion">
                Iniciar sesión
              </Link>
            </li>
          )}
          <li>
            <Link className="botonAccion" to="/Perfil">
              {user ? user.nombre : "Perfil"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
