import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondiArmarPlan from "../imgs/piramid.jpg";
import "../estilos/styArmarPlan.css";
import FichaLugares from "../componentes/FichaLugares";
import Lugar1 from "../imgs/explora01.jpg";
import BusquedaLugares from "../componentes/BusquedaLugares";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendar, FaPlus, FaUser, FaUserFriends, FaUsers } from 'react-icons/fa';
import { useSearch } from "../context/searchContext";

export default function ArmarPlan() {
  const {setSearchData} = useSearch();
  const navigate = useNavigate();
  const [ciudad, setCiudad] = useState("");
  const [estancia, setEstancia] = useState("Unas cuantas horas");
  const [acompanantes, setAcompanantes] = useState("Voy solo");
  const [presupuesto, setPresupuesto] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [calificacionMinima, setCalificacionMinima] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [errorCiudad, setErrorCiudad] = useState(false);

  useEffect(() => {
    if (acompanantes === "Voy solo") {
      setAmbiente("tranquilo");
    } else if (acompanantes === "Con pareja") {
      setAmbiente("romántico");
    } else if (acompanantes === "Familia/Amigos") {
      setAmbiente("familiar");
    }
  }, [acompanantes]);

  {/*const handleAgregarCiudad = () => {
    navigate("/AgregarCiudad", {
      state: {
        ciudad,
      },
    });
  };*/}

  const handleExploraActividades = () => {
    const translatedPresupuesto = translatePriceRange(presupuesto);
    if (!ciudad) {
      setErrorCiudad(true); // Ciudad vacia
      alert("Por favor, ingresa una ciudad");
      return;
    }
    setSearchData({
      ciudad,
      categoria,
      presupuesto,
      calificacionMinima,
      ambiente,
      acompanantes,
    });
    navigate("/LugaresCarrusel");
  };

  return (
    <div className="contenedorVistaAP">
      <div
        className="contenedorUnoAP"
        style={{
          backgroundImage: `url(${fondiArmarPlan})`,
        }}
      >
        <div className="contenedorDos">
          <h1>Busquemos algo increíble</h1>
          <div className="contenidoImagenPlan">
            <div className="selector-item">
              <label>Buscar ciudad</label>
              <div className="input-container">
                <input
                  type="text"
                  className="text-field"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ingresa una ciudad"
                />
                <FaMapMarkerAlt className="input-icon" />
              </div>
            </div>
            <div className="selector-item">
              <label>Tiempo estimado de estancia</label>
              <div className="button-group">
                <div className="button-item">
                  <button
                    className={`button-field ${estancia === "Unas cuantas horas" ? "active" : ""}`}
                    onClick={() => setEstancia("Unas cuantas horas")}
                  >
                    <FaClock />
                  </button>
                  <span className="button-label">Horas</span>
                </div>
                <div className="button-item">
                  <button
                    className={`button-field ${estancia === "Un día" ? "active" : ""}`}
                    onClick={() => setEstancia("Un día")}
                  >
                    <FaCalendar />
                  </button>
                  <span className="button-label">Días</span>
                </div>
                <div className="button-item">
                  <button
                    className={`button-field ${estancia === "Fin de semana" ? "active" : ""}`}
                    onClick={() => setEstancia("Fin de semana")}
                  >
                    <FaPlus />
                  </button>
                  <span className="button-label">Más</span>
                </div>
              </div>
            </div>
            <div className="selector-item">
              <label>Acompañantes</label>
              <div className="button-group">
                <div className="button-item">
                  <button
                    className={`button-field ${acompanantes === "Voy solo" ? "active" : ""}`}
                    onClick={() => setAcompanantes("Voy solo")}
                  >
                    <FaUser />
                  </button>
                  <span className="button-label">Solo</span>
                </div>
                <div className="button-item">
                  <button
                    className={`button-field ${acompanantes === "Con pareja" ? "active" : ""}`}
                    onClick={() => setAcompanantes("Con pareja")}
                  >
                    <FaUserFriends />
                  </button>
                  <span className="button-label">Pareja</span>
                </div>
                <div className="button-item">
                  <button
                    className={`button-field ${acompanantes === "Familia/Amigos" ? "active" : ""}`}
                    onClick={() => setAcompanantes("Familia/Amigos")}
                  >
                    <FaUsers />
                  </button>
                  <span className="button-label">Amigos</span>
                </div>
              </div>
            </div>
            <div className="selector-item">
              <label>Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="select-field"
              >
                <option value="all">Todas las Categorias</option>
                <option value="art">Arte</option>
                <option value="shop">Compras</option>
                <option value="history">Cultura e Historia</option>
                <option value="sport">Deportes y Actividades Extremas</option>
                <option value="family">Familia y Niños</option>
                <option value="food">Gastronomia</option>
                <option value="nature">Naturaleza y Aventura</option>
                <option value="night">Vida Nocturna</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Presupuesto (por persona)</label>
              <div className="range-container">
                <span className="range-label range-label-left">$</span>
                <input
                  type="range"
                  className="range-field"
                  value={presupuesto}
                  min="0"
                  max="3000"
                  onChange={(e) => setPresupuesto(e.target.value)}
                />
                <span className="range-label range-label-right">$$$</span>
              </div>
              <span>{presupuesto >= 3000 ? "$3000 o más" : `$${presupuesto}`}</span>
            </div>
          </div>
          <div className="button-container">
            <button className="botAccion" onClick={handleExploraActividades}>
              Explora Actividades
            </button>
            {/*<button className="botAccion" onClick={handleAgregarCiudad}>
              Agregar Ciudad
            </button>*/}
          </div>
        </div>
      </div>

      <h2>Lugares Recomendados</h2>
      <BusquedaLugares ciudad="Ciudad de México" keywords="restaurant| parque |plaza" />
        
    </div>
  );
}

const translatePriceRange = (value) => {
  if (value <= 300) return 1;
  if (value <= 600) return 2;
  if (value <= 1500) return 3;
  if (value <= 2500) return 4;
  return 0; // Para el valor inicial de 0
};
