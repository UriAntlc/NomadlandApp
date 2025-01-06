import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../estilos/detallecategoria.css";
import Categoria from "../componentes/Categoria"; // Ajusta la ruta según sea necesario
import BotonRegresar from "../componentes/BotonRegresar";

const VistaLugares = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itinerarios, setItinerarios] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Ciudad de México'); // Valor por defecto "CDMX"
  const { categoria, ciudad } = location.state;
  const { titulo, contenido, imagen } = location.state || {};
  const [expandedItinerary, setExpandedItinerary] = useState(null);  // Control de desplegado


  const categorias = {

    gastronomia :[
    "restaurant",
    "pizza_restaurant",
    "mexican_restaurant",
    "italian_restaurant",
    "chinese_restaurant",
    "indian_restaurant",
    "fast_food_restaurant",
    "vegan_restaurant",
    "vegetarian_restaurant",
    "seafood_restaurant",
    "hamburger_restaurant",
    "sushi_restaurant",
    "brunch_restaurant",
    "coffee_shop",
    "ice_cream_shop",
    "bakery",
    "bar",
    "wine_bar"],

  Cultura : [
    "art_gallery", "art_studio", "auditorium", "cultural_landmark", "historical_place", "monument", 
    "museum", "sculpture", "historical_landmark", "library"
  ],
  
  ArteEntretenimiento : [
    "art_gallery", "art_studio", "auditorium", "cultural_landmark", "museum", "performing_arts_theater", 
    "sculpture", "library", "karaoke", "movie_theater", "opera_house", "philharmonic_hall", "planetarium"
  ],
  
  Naturaleza: [
    "adventure_sports_", "adventure_sports_center", "aquarium", "botanical_garden", "cycling_park", 
    "dance_hall", "dog_park", "ferris_wheel", "garden", "hiking_area", "historical_landmark", "national_park", 
    "off_roading_area", "skateboard_park", "state_park", "tourist_attraction", "water_park", "wildlife_park", 
    "wildlife_refuge", "zoo", "park", "roller_coaster", "beach"
  ],
  
  VidaNocturna : [
    "karaoke", "night_club", "bar", "liquor_store", "wine_bar"
  ],
  
  Compras : [
    "acai_shop", "bagel_shop", "bakery", "candy_store", "chocolate_factory", "chocolate_shop", "coffee_shop", 
    "confectionery", "dessert_shop", "donut_shop", "food_court", "ice_cream_shop", "juice_shop", "sandwich_shop", 
    "florist", "food_delivery", "asian_grocery_store", "book_store", "clothing_store", "convenience store", 
    "department_store", "discount_store", "food_store", "jewelry_store", "market", "shopping_mall", "supermarket", 
    "plaza", "wine_bar"
  ],
  
  FamiliaNinos : [
    "childrens_camp", "movie_theater", "tourist_attraction", "water_park", "wildlife_park", "wildlife_refuge", 
    "zoo", "shopping_mall", "cycling_park", "park", "planetarium", "plaza", "roller_coaster", "beach"
  ],
  
  Deportes : [
    "adventure_sports_", "adventure_sports_center", "aquarium", "bowling_alley", "casino", "comedy_club", 
    "ferris_wheel", "off_roading_area", "skateboard_park", "tourist_attraction", "water_park", 
    "video_arcade",  "cycling_park", "dance_hall", "park", "planetarium"
  ], };

  
  // Mapeo de las categorías en inglés a español para la visualización
  const categoriasTraduccion = {

    "bowling_alley": "Boliche",
    "casino": "casino",
    "comedy_club": "Club de comedia",
    "video_arcade": "Juegos de arcade",
    "restaurant": "Restaurantes",
    "pizza_restaurant": "Restaurantes de Pizza",
    "mexican_restaurant": "Restaurantes Mexicanos",
    "italian_restaurant": "Restaurantes Italianos",
    "chinese_restaurant": "Restaurantes Chinos",
    "indian_restaurant": "Restaurantes Indios",
    "fast_food_restaurant": "Comida Rápida",
    "vegan_restaurant": "Restaurantes Veganos",
    "vegetarian_restaurant": "Restaurantes Vegetarianos",
    "seafood_restaurant": "Restaurantes de Mariscos",
    "hamburger_restaurant": "Restaurantes de Hamburguesas",
    "sushi_restaurant": "Restaurantes de Sushi",
    "brunch_restaurant": "Restaurantes de Brunch",
    "coffee_shop": "Cafeterías",
    "ice_cream_shop": "Heladerías",
    "bakery": "Panaderías",
    "bar": "Bares",
    "wine_bar": "Bares de Vino",
     // Cultura e Historia
    "art_gallery": "Galería de Arte",
    "art_studio": "Estudio de Arte",
    "auditorium": "Auditorio",
    "cultural_landmark": "Hito Cultural",
    "historical_place": "Lugar Histórico",
    "monument": "Monumento",
    "museum": "Museo",
    "sculpture": "Escultura",
    "historical_landmark": "historical_landmark",
    "library": "Biblioteca",

    // Arte y Entretenimiento
    "performing_arts_theater": "Teatro de Artes Escénicas",
    "movie_theater": "Cine",
    "opera_house": "Teatro de Ópera",
    "philharmonic_hall": "Sala Sinfónica",
    "planetarium": "Planetario",
    
    // Naturaleza y Aventura
    "adventure_sports_": "Deportes de Aventura",
    "adventure_sports_center": "Centro de Deportes de Aventura",
    "aquarium": "Acuario",
    "botanical_garden": "Jardín Botánico",
    "cycling_park": "Parque de Ciclismo",
    "dance_hall": "Salón de Baile",
    "dog_park": "Parque para Perros",
    "ferris_wheel": "Rueda de la Fortuna",
    "garden": "Jardín",
    "hiking_area": "Zona de Senderismo",
    "historical_landmark": "Monumento Histórico",
    "national_park": "Parque Nacional",
    "off_roading_area": "Zona de Off-Roading",
    "skateboard_park": "Parque de Skateboard",
    "state_park": "Parque Estatal",
    "tourist_attraction": "Atractivo Turístico",
    "water_park": "Parque Acuático",
    "wildlife_park": "Parque de Vida Silvestre",
    "wildlife_refuge": "Refugio de Vida Silvestre",
    "zoo": "Zoológico",
    "park": "Parque",
    "roller_coaster": "Montaña Rusa",
    "beach": "Playa",

    // Vida Nocturna
    "karaoke" : "karaoke",
    "night_club": "Discoteca",
    "liquor_store": "Tienda de Licores",
    "wine_bar": "Bar de Vinos",
   

    // Compras
    "acai_shop": "Tienda de Acai",
    "bagel_shop": "Tienda de Bagels",
    "bakery": "Panaderia",
    "candy_store": "Tienda de Golosinas",
    "chocolate_factory": "Fábrica de Chocolate",
    "chocolate_shop": "Tienda de Chocolate",
    "coffee_shop": "Tienda de Café",
    "confectionery": "Confitería",
    "dessert_shop": "Tienda de Postres",
    "donut_shop": "Tienda de Donuts",
    "food_court": "Comedor",
    "ice_cream_shop": "Tienda de Helados",
    "juice_shop": "Tienda de Jugos",
    "sandwich_shop": "Tienda de Sándwiches",
    "florist": "Florería",
    "food_delivery": "Comida para llevar",
    "asian_grocery_store": "Tienda asiatica",
    "book_store": "Librería",
    "clothing_store": "Tienda de Ropa",
    "convenience store": "Tienda de conveniencia",
    "department_store": "Tienda Departamental",
    "discount_store": "Tienda de descuento",
    "food_store": "Tienda de comida",
    "jewelry_store": "Joyeria",
    "market": "Mercado",
    "shopping_mall": "Centro comercial",
    "supermarket": "Supermercado",
    "plaza": "Plaza",
    "wine_bar": "Tienda de vinos",

    "childrens_camp": "Campamento de niños",
  
  };
  
  // Estado para manejar las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]); // Aquí inicializamos

  
  // Detectar si la categoría es gastronómica y mostrar los checkboxes
  useEffect(() => {
    if (categoria && categorias[categoria]) {
      setShowCheckboxes(true);
      setAvailableCategories(categorias[categoria]); // Establecer las categorías disponibles
    } else {
      setShowCheckboxes(false);
      setAvailableCategories([]); // Resetear categorías si no existe una válida
    }
  }, [categoria]);
  
// Manejador de cambios en los checkboxes
const handleCategoryChange = (e) => {
  const value = e.target.value;
  setSelectedCategories(prevState =>
    e.target.checked
      ? [...prevState, value]  // Agregar la categoría seleccionada
      : prevState.filter(cat => cat !== value)  // Eliminar la categoría deseleccionada
  );
};



  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return "https://via.placeholder.com/400";
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  // Función para realizar la búsqueda, actualizada para usar las categorías seleccionadas
 // Función para realizar la búsqueda, actualizada para usar las categorías seleccionadas
  const fetchLugares = async () => {
  setLoading(true);
  setError(null);
  setLugares([]);

  try {
    const categoriasParaBusqueda = selectedCategories.length > 0 ? selectedCategories : [categoria]; // Usamos las categorías seleccionadas
    const url = `http://localhost:3002/search?city=${ciudad}&category=${categoriasParaBusqueda.join(",")}&radius=5000`;
    const response = await axios.get(url);

    const fetchedLugares = response.data.results.map((result) => ({
      id: result.place_id,
      title: result.name,
      location: result.formatted_address || result.vicinity,
      image: getPhotoUrl(result.photo_reference),
      rating: result.rating || "Sin calificación",
      userRatingsTotal: result.user_ratings_total || 0,
      openingTime: result.opening_hours
        ? result.opening_hours.open_now
          ? "Abierto ahora"
          : "Cerrado"
        : "Horario no disponible",
    }));

    setLugares(fetchedLugares);
    generarItinerarios(fetchedLugares);
  } catch (error) {
    setError("Ocurrió un error al obtener los lugares.");
    console.error("Error al realizar la búsqueda:", error);
  } finally {
    setLoading(false);
  }
};

// Hacer la búsqueda cada vez que las categorías seleccionadas cambian
useEffect(() => {
  fetchLugares();
}, [selectedCategories]);
  
  

  const handleViewMoreClick = async (lugar) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${lugar.id}`;
      const detailsResponse = await axios.get(detailsUrl);
      const lugar_id = lugar.id;
      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        lugar.title
      )}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        lugar.title
      )}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      const placeData = {
        searchQuery,
        ...lugar,
        ...detailsResponse.data,
        id: lugar.id,
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
      };
      console.log({message: "Placedata ", placeData});
      console.log({message: "Lugar ", lugar});
      navigate("/actividad", { state: placeData });
    } catch (error) {
      console.error("Error al obtener detalles del lugar:", error);
    }
  };

  useEffect(() => {
    fetchLugares();
  }, [searchQuery]); // Cuando 'searchQuery' cambie, vuelve a realizar la búsqueda
  
  const generarItinerarios = (lugares) => {
    let copiaLugares = [...lugares];
    copiaLugares.sort(() => 0.5 - Math.random());

    const itinerariosGenerados = [[], [], []];
    copiaLugares.forEach((lugar, index) => {
      const itinerarioIndex = index % 3;
      if (itinerariosGenerados[itinerarioIndex].length < 5) {
        itinerariosGenerados[itinerarioIndex].push(lugar);
      }
    });

    setItinerarios(itinerariosGenerados);
  };

  const toggleItinerary = (index) => {
    setExpandedItinerary(expandedItinerary === index ? null : index);
  };

  useEffect(() => {
    fetchLugares();
  }, []);
  
  return (
    <div className="carousel-container1">
       <Categoria titulo={titulo} contenido={contenido} imagen ={imagen} />
      <div style={{ position: "absolute", top: "100px", left: "60px", zIndex: 10 }}>
        <BotonRegresar />
      </div>
      <h2 className="titula">Lugares de interés</h2>
      <div className="content-container">
        {/* Filtros: búsqueda y categorías */}
        <div className="filters-column">
          <div className="search-column1">
            <h2>Busca lugares</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchLugares();
              }}
            >
              <div>
                <label htmlFor="searchQuery">Buscar lugar:</label>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ingresa un lugar"
                />
              </div>
              <button type="submit">Buscar</button>
            </form>
          </div>
  
          {showCheckboxes && (
            <div className="categories-column1">
              <h3>Selecciona las categorías:</h3>
              <div className="checkbox-group">
                {availableCategories.map((category) => (
                  <label key={category}>
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(category)}
                    />
                    {categoriasTraduccion[category]}
                  </label>
                ))}
              </div>
            </div>
          )}
        
              {/* Nueva sección de itinerarios como acordeón */}
      <div className="itinerary-container">
        <h2 className="itinerary-title">Itinerarios Generados</h2>
        {itinerarios.map((itinerario, index) => (
          <div key={index} className="itinerary-card">
            <button
              className="accordion-btn"
              onClick={() => toggleItinerary(index)}
            >
              {expandedItinerary === index ? 'Cerrar' : `Itinerario ${index + 1}`}
            </button>
            {expandedItinerary === index && (
              <div className="accordion-content">
                {itinerario.map((lugar) => (
                  <div key={lugar.id} className="itinerary-item">
                    <img
                      src={lugar.image}
                      alt={lugar.title}
                    />
                    <h4>{lugar.title}</h4>
                    <p>{lugar.location}</p>
                    <p>Calificación: {lugar.rating}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

        </div>
        {/* Lista de lugares */}
        <div className="list-container1">
          {loading && <p>Cargando lugares...</p>}
          {error && <p>{error}</p>}
          {lugares.length > 0 ? (
            lugares.map((lugar) => (
              <div key={lugar.id} className="list-item1">
                <img
                  src={lugar.image}
                  alt={lugar.title}
                  className="package-image1"
                />
                <h3>{lugar.title}</h3>
                <p>
                  <strong>Calificación:</strong> {lugar.rating}
                </p>
                <p>
                  <strong>Ubicación:</strong> {lugar.location}
                </p>
                <p>
                  <strong>Estado:</strong> {lugar.openingTime}
                </p>
                <button
                  className="view-more-btn1"
                  onClick={() => handleViewMoreClick(lugar)}
                >
                  Ver más
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No se encontraron lugares para esta búsqueda.</p>
          )}
        </div>
      </div>
    </div>
  );  
};  

export default VistaLugares;  