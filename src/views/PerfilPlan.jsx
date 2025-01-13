import React, { useEffect, useState } from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";
import BotonRegresar from "../componentes/BotonRegresar";
import BotonRegresar2 from "../componentes/BotonRegresar2";
import axios from 'axios';
import { LuPrinter } from 'react-icons/lu';
import { FaCheck, FaEdit, FaRoute, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { calcularRuta } from '../componentes/calcularRuta';
import { useLocation } from "react-router-dom";
const PerfilPlan = () => {
    const location = useLocation();
  const [plan, setPlan] = useState([]);
  const navigate = useNavigate();
    const [edicionIndex, setEdicionIndex] = useState(null);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [idplan, setIdplan] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const ID_plan = location.state || {}; // Asegura que no sea undefined
  const {
    ID = ID_plan,
  } = ID_plan
  // Función para calcular la ruta óptima y devolver el enlace de Google Maps
  const calcularRuta = async (placeIds, travelMode = 'driving') => {
    if (!placeIds.length) return null;
    let currentPlace = placeIds[0];
    const route = [currentPlace];
    const visited = new Set([currentPlace]);

    while (visited.size < placeIds.length) {
      const nextPlace = await findNextPlace(currentPlace, placeIds, visited);
      if (!nextPlace) break;
      route.push(nextPlace);
      visited.add(nextPlace);
      currentPlace = nextPlace;
    }

    const placeDetails = await fetchPlaceDetails(route);
    console.log("Ruta optimizada:", route);
    console.log("Detalles de los lugares:", placeDetails);
    return generateMapsLink(route, placeDetails, travelMode);
  };
  
  const findNextPlace = async (currentPlace, placeIds, visited) => {
    const destinations = placeIds.filter(place => !visited.has(place)).join('|');
    if (!destinations) return null;

    try {
      const response = await axios.get(`http://localhost:3002/route-matrix?origins=${currentPlace}&destinations=${destinations}`);
      const data = response.data;

      console.log("Datos de la API:", data);

      if (data.rows && data.rows[0] && data.rows[0].elements) {
        let minDuration = Infinity;
        let nextPlace = null;

        data.rows[0].elements.forEach((element, index) => {
          if (element.status === "OK" && element.duration.value < minDuration) {
            minDuration = element.duration.value;
            nextPlace = placeIds.filter(place => !visited.has(place))[index];
          }
        });

        console.log("Siguiente lugar más cercano:", nextPlace);
        return nextPlace;
      }

      return null;
    } catch (error) {
      console.error("Error al obtener la matriz de rutas:", error);
      return null;
    }
  };
  
  const fetchPlaceDetails = async (route) => {
    const placeDetails = [];

    for (const place_id of route) {
      try {
        const response = await axios.get(`http://localhost:3002/place-directions?place_id=${place_id}`);
        if (response.data) {
          placeDetails.push(response.data);
          console.log(`Place ID: ${place_id}, Dirección: ${response.data.formatted_address}`);
        } else {
          console.error(`Error: No se encontraron detalles para el lugar con ID ${place_id} Respuesta:`, response.data);
        }
      } catch (error) {
        console.error(`Error al obtener detalles del lugar con ID ${place_id}:`, error);
      }
    }

    return placeDetails;
  };
  
  const generateMapsLink = (route, placeDetails, travelMode) => {
    if (!placeDetails || route.length === 0) {
      console.error("Error: No se pudo generar el enlace debido a datos incompletos.");
      return null;
    }
  
    console.log("Detalles de los lugares para el enlace:");
    placeDetails.forEach((place, index) => {
      if (place && place.formatted_address) {
        console.log(`Place ID: ${route[index]}, Dirección: ${place.formatted_address}`);
      } else {
        console.error(`Error: Dirección no encontrada para el lugar con ID ${route[index]}`);
      }
    });
  
    const origin = placeDetails[0]?.formatted_address ? encodeURIComponent(placeDetails[0].formatted_address) : '';
    const destination = placeDetails[placeDetails.length - 1]?.formatted_address ? encodeURIComponent(placeDetails[placeDetails.length - 1].formatted_address) : '';
  
    const waypoints = route.length > 2
      ? route.slice(1, -1).map((_, index) => placeDetails[index + 1]?.formatted_address ? encodeURIComponent(placeDetails[index + 1].formatted_address) : '').join('|')
      : '';
  
    // Imprime los valores de origen, destino y waypoints
    console.log("Origen:", decodeURIComponent(origin));
    console.log("Destino:", decodeURIComponent(destination));
    console.log("Waypoints:", waypoints ? decodeURIComponent(waypoints.replace(/\|/g, ', ')) : 'Ninguno');
  
    if (!origin || !destination) {
      console.error("Error: No se pudo generar el enlace debido a direcciones incompletas.");
      return null;
    }
  
    const link = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=${travelMode}`;
    console.log("Enlace generado:", link);
    return link;
  };
  
  const handleVerRuta = async () => {
    if (plan.length > 0) {
      const placeIds = plan.map(actividad => actividad.ID_google);
      console.log("IDs de lugares:", placeIds);

      try {
        const link = await calcularRuta(placeIds, 'driving');
        if (link) {
          setMapsLink(link);
        } else {
          console.error("No se pudo generar el enlace.");
        }
      } catch (error) {
        console.error("Error al calcular la ruta:", error);
      }
    }
  };
  
  const Completar = () => {
    alert("Plan completado, felicidades");
    navigate("/Perfil");
  }
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        console.log('ID recibido ', ID);
        const requestData = {
            ID_plan: ID,
          };
        const response = await axios.post('http://localhost:3001/plan/planPerfil', requestData,{
          withCredentials: true,
        });
        const planData = response.data;
        console.log(planData);
        setPlan(planData);
      } catch (error) {
        console.error("Error al obtener el plan del usuario:", error);
      }
    };
    fetchPlan();
  }, []);
  const handleDeleteActivity = (nombreActividad) => {
    setPlan(prevPlan =>
      prevPlan.filter(actividad => actividad.nombre_actividad !== nombreActividad)
    );
  };
    const Limpiar = async () =>{
      
    }
    const iniciarEdicion = (index, nombreActual, id_plan) => {
      setEdicionIndex(index);
      setNuevoNombre(nombreActual || '');
      setIdplan(id_plan)
    };
    const guardarNombre = async (index) => {
      const nuevoNombreActividad = nuevoNombre || 'Nombre no disponible';
      const plan_id = idplan;
      const actividadId = plan[index].ID_actividad; // Ajusta al campo que identifica la actividad
    
      try {
        // Enviar los cambios al backend
        const response = await axios.put(
          `http://localhost:3001/plan/nombrePlanPerfil`, // Ajusta la URL según tu backend
          {
            ID_plan: plan_id,
            PlanNombre: nuevoNombreActividad,
          },
          { withCredentials: true } // Si usas cookies para autenticación
        );
    
        // Confirmar éxito y actualizar el estado del front-end
        if (response.status === 200) {
          const nuevoPlan = [...plan];
          nuevoPlan[index].nombre_itinerario = nuevoNombreActividad;
          setPlan(nuevoPlan);
          alert("Nombre actualizado correctamente");
        } else {
          alert("No se pudo actualizar el nombre. Intenta nuevamente.");
        }
      } catch (error) {
        console.error("Error al actualizar el nombre:", error);
        alert("Ocurrió un error al guardar el nombre.");
      }
    
      setEdicionIndex(null);
      setNuevoNombre('');
    };

    return (
    <div className="contenedorVista">  
      <div className="contenedorTitulo">  
        <BotonRegresar2 />  
        <h1 className="tituloRevisarPlan">Actividades del Plan</h1>  
      </div>  
      <div className="contenedorPrincipal">
      <div className="contenedorActividades">
          {plan.map((actividad, index) => (
              <ActividadAgregada
              key={index}
              imagen = {actividad.imagen_actividad}
              nombre={actividad.nombre_actividad}
              ubicacion="" 
              horario=""
              onDelete={handleDeleteActivity}
              ID_actividad={actividad.ID_actividad}
              ID_google={actividad.ID_google}
            />
          ))}
            
            <div className="contenedorBotonesAccion">
              <button className="botonVerRuta" onClick={handleVerRuta}>
                <FaRoute /> Ver ruta
              </button>
            </div>
            {mapsLink && (
              <div>
                {/*
                
                */}<a href={mapsLink} target="_blank" rel="noopener noreferrer">Link</a>
              </div>
            )}
        </div>
        <div className="contenedorLadoDerecho">  
        <div className="nombrePlanContenedor">
            {plan.map((actividad, index) => (
              index === 0 && ( // Limita el renderizado al primer elemento del arreglo
                <div key={index}>
                  {edicionIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        placeholder="Ingresa un nuevo nombre"
                      />
                      <button onClick={() => guardarNombre(index)}>Guardar</button>
                      <button onClick={() => setEdicionIndex(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <h3 className="nombrePlan">
                        {actividad.nombre_itinerario || 'Nombre no disponible'}
                      </h3>
                      <button onClick={() => iniciarEdicion(index, actividad.nombre_itinerario)}>
                        Editar
                      </button>
                    </>
                  )}
                </div>
              )
            ))}
          </div>
          <div className="detalleActividades">
            {/*
            <strong>Ciudad:</strong> Descripción del lugar
              <strong>Acompañantes:</strong> 2 personas
            */}
        
          {/*<div className="nombrePlanContenedor">  
            <h3 className="nombrePlan">Fecha</h3>  
            <button className="botonEditarNombre">Editar</button>  
          </div>*/}
              <strong>No. de actividades: {plan.length}</strong>
              {plan.map((actividad, index) => (
                <div key={index}>
                  {/* Aquí va el contenido de cada actividad */}
                  Actividad {index + 1}: {actividad.nombre_actividad}
                </div>
              ))}
              <strong>Mascota:</strong> Sí 
              <strong>Capacidades diferentes:</strong> Ninguna 
          </div>  
        </div>  
      </div>
    </div>
  );
};
export default PerfilPlan;