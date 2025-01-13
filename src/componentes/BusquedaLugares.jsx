import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CarouselOptions.css';
import axios from 'axios';
import PantallaCarga from "../componentes/PantallaCarga";
import Alertas from "../componentes/Alertas";

const BusquedaLugares = ({ ciudad, keywords }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [city, setCity] = useState(location.state?.ciudad || ciudad || '');
  const [keywordsState, setKeywords] = useState(location.state?.keywords || keywords || '');
  const [radius, setRadius] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState(location.state?.calificacionMinima || '');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itinerarios, setItinerarios] = useState([]);
  const [expandedItinerary, setExpandedItinerary] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError(null);
    setPackages([]);
    setNoResults(false);

    try {
      let url = `http://localhost:3002/search?city=${city}&keywords=${keywordsState}&radius=${radius}`;

      if (priceRange && priceRange !== '4') {
        url += `&priceRange=${priceRange}`;
      }

      if (rating) {
        url += `&rating>=${rating}`;
      }

      const response = await axios.get(url);

      let fetchedPackages = response.data.results.map(result => ({
        id: result.place_id,
        title: result.name,
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
      }));

      if (fetchedPackages.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      setPackages(fetchedPackages);
      setIsLoading(false);
      generarItinerarios(fetchedPackages);

    } catch (error) {
      setError('Ocurrió un error al realizar la búsqueda.');
    } finally {
      setLoading(false);
    }
  };

  const generarItinerarios = (lugares) => {
    let copiaLugares = [...lugares];
    copiaLugares.sort(() => 0.5 - Math.random());

    const itinerariosGenerados = [[], [], []];
    copiaLugares.forEach((lugar, index) => {
      const itinerarioIndex = index % 3;
      if (itinerariosGenerados[itinerarioIndex].length < 3) {
        itinerariosGenerados[itinerarioIndex].push(lugar);
      }
    });

    setItinerarios(itinerariosGenerados);
    console.log("Itinerarios generados:", itinerariosGenerados);  // Verifica que se generan correctamente
};


  const agregarItinerario = async (itinerario) => {
    const URI = "http://localhost:3001/plan/insertarLugar";
    try {
      setIsLoading(true); // Activar la pantalla de carga
      for (const lugar of itinerario) {
        // Extraer solo los elementos necesarios
        const requestData = {
          nombre_actividad: lugar.title,
          imagen_actividad: lugar.image,
          ID_google: lugar.id,
          controlador: 1,
        };
        console.log(requestData);
        const response = await axios.post(URI, requestData, { withCredentials: true }); // Enviar cookies de autenticación
        console.log(response.data.message); // Mostrar mensaje en la consola
      }
      alert("Itenerario cargado con exito");
    } catch (error) {
      console.error('Error al enviar los datos seleccionados:', error);
      alert('Ocurrió un error al enviar los datos seleccionados del itinerario');
    }finally{
      setIsLoading(false); // Desactivar la pantalla de carga
    }
  };

  const toggleItinerary = (index) => {
    setExpandedItinerary(expandedItinerary === index ? null : index);
  };

  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400';
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  useEffect(() => {
    handleSubmit();
  }, [city, keywordsState, radius, priceRange, rating]);

  return (
    <>
    {isLoading ? (
        <PantallaCarga message="Cargando datos, por favor espera..." />
      ) : (
      <div className="carousel-container">
        {loading && <p>Buscando...</p>}
        {error && <p>{error}</p>}
        {packages.length > 0 ? (
          <div className="list-container">
            {packages.map(pkg => (
              <div key={pkg.id} className="list-item">
                <img src={pkg.image} alt={pkg.title} className="package-image" />
                <div className="package-info">
                  <h3>{pkg.title}</h3>
                  <p><strong>Calificación:</strong> {pkg.rating}</p>
                  <p><strong>Ubicación:</strong> {pkg.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="itinerary-container">
          <h2 className="itinerary-title">Planes Generados</h2>
          {itinerarios.length > 0 ? (
            <div className="itinerary-container">
              <h2 className="itinerary-title">Planes Generados</h2>
              {itinerarios.map((itinerario, index) => (
                <div key={index} className="itinerary-card">
                  <button
                    className="accordion-btn"
                    onClick={() => toggleItinerary(index)}
                  >
                    {expandedItinerary === index ? 'Cerrar' : `Plan ${index + 1}`}
                  </button>
                  {expandedItinerary === index && (
                    <div className="accordion-content">
                      {itinerario.map((lugar) => (
                        <div key={lugar.id} className="itinerary-item">
                          <img src={lugar.image} alt="" />
                          <h4>{lugar.title}</h4>
                          <p>{lugar.location}</p>
                        </div>
                      ))}
                      {isLoading && <PantallaCarga message="Enviando itinerario, por favor espera..." />}
                      <button
                        className="save-itinerary-btn"
                        onClick={() => agregarItinerario(itinerario)}
                      >
                        Guardar Itinerario
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            ) : (
            <p>No hay itinerarios generados</p>
          )}
        </div>
        {noResults && <h1>No se encontraron resultados para tu búsqueda :(</h1>}
      </div>
      )}
    </>
  );
};

export default BusquedaLugares;
