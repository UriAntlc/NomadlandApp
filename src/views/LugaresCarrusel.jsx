import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CarouselOptions.css';
import axios from 'axios';
import { useSearch } from '../context/searchContext';

const LugaresCarrusel = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const {SearchData} = useSearch();
  const {ciudad, categoria: contextCategory, presupuesto} = SearchData;

  // Estado para manejar las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  const [city, setCity] = useState(location.state?.ciudad || '');
  const [radius, setRadius] = useState('');
  const [categoria, setCategory] = useState(location.state?.categoria || '');
  const [keywords, setKeywords] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState(location.state?.calificacionMinima || '');
  const [ambiance, setAmbiance] = useState(location.state?.ambiente || '');
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [itinerarios, setItinerarios] = useState([]);
  const [expandedItinerary, setExpandedItinerary] = useState(null);

  useEffect(() => {
    if (contextCategory && categorias[contextCategory]) {
      setShowCheckboxes(true);
      setAvailableCategories(categorias[contextCategory]);
    } else {
      setShowCheckboxes(false);
      setAvailableCategories([]);
    }
  }, [contextCategory]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(prevState =>
      e.target.checked
        ? [...prevState, value]
        : prevState.filter(cat => cat !== value)
    );
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError(null);
    setPackages([]);
    setNoResults(false);

    try {
      const categoriasParaBusqueda = selectedCategories.length > 0 ? selectedCategories : [contextCategory];
      let url = `http://localhost:3002/search?city=${city}&category=${categoriasParaBusqueda.join(",")}&radius=${radius}&keywords=${keywords}`;

      if (contextCategory !== 'museum' && priceRange && priceRange !== '4') {
        url += `&priceRange=${priceRange}`;
      }

      if (rating) {
        if (rating === '4') {
          url += ``;
        } else {
          url += `&rating>=${rating}`;
        }
      }

      const response = await axios.get(url);

      let fetchedPackages = response.data.results.map(result => ({
        id: result.place_id,
        title: result.name,
        category: categoria,
        recommendedTime: "Tiempo recomendado no disponible",
        openingTime: result.opening_hours ? (result.opening_hours.open_now ? "Abierto ahora" : "Cerrado") : "Horario no disponible",
        price: result.price_level !== undefined ? mapPriceLevel(result.price_level) : "Precio no disponible",
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
        userRatingsTotal: result.user_ratings_total || 0
      }));

      if (fetchedPackages.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      fetchedPackages.sort((a, b) => b.rating - a.rating);

      if (lessKnown) {
        fetchedPackages = fetchedPackages.filter(pkg => pkg.userRatingsTotal < 50);
      }

      if (nonTourist) {
        fetchedPackages = fetchedPackages.filter(pkg => !pkg.location.toLowerCase().includes("turístico"));
      }

      setPackages(fetchedPackages);
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
      if (itinerariosGenerados[itinerarioIndex].length < 5) {
        itinerariosGenerados[itinerarioIndex].push(lugar);
      }
    });

    setItinerarios(itinerariosGenerados);
  };

  const agregarItinerario = async (itinerario) => {
    try {
      const response = await axios.post("http://localhost:3002/api/plan/crearItinerario", {
        actividades: itinerario,
        nombrePlan: `Itinerario - ${new Date().toLocaleDateString()}`,
      });
      alert("Itinerario agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el itinerario:", error);
      alert("Hubo un error al agregar el itinerario");
    }
  };

  const toggleItinerary = (index) => {
    setExpandedItinerary(expandedItinerary === index ? null : index);
  };

  const mapPriceLevel = (priceLevel) => {
    switch (priceLevel) {
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
        return '$$$';
      case 4:
        return '$$$$';
      default:
        return 'Precio no disponible';
    }
  };
  useEffect(() => {
    handleSubmit();
  }, [selectedCategories]);

  useEffect(() => {
    if (city || categoria || priceRange || rating || keywords || ambiance) {
      handleSubmit();
    }
  }, [city, categoria, priceRange, rating, keywords, ambiance]);

  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400';
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  const handleViewMoreClick = async (pkg) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${pkg.id}`;
      const detailsResponse = await axios.get(detailsUrl);

      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      const placeData = { 
        ...pkg, 
        ...detailsResponse.data, 
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
        category: pkg.category
      };

      navigate('/actividad', { state: placeData });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  const renderStars = (rating) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return <div className="stars">Calificación no disponible</div>;
    }
  
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => <span key={index} className="star full">★</span>)}
        {halfStars === 1 && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, index) => <span key={index} className="star empty">☆</span>)}
      </div>
    );
  };

  return (
    <div className="carousel-container">
      <form onSubmit={handleSubmit}>
        <h2>Busca tu lugar favorito</h2>
        <div>
          <label htmlFor="city">Lugar:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las Categorias</option>
            <option value="ArteEntretenimiento">Arte</option>
            <option value="Compras">Compras</option>
            <option value="Cultura">Cultura e Historia</option>
            <option value="Deportes">Deportes y Actividades Extremas</option>
            <option value="FamiliaNinos">Familia y Niños</option>
            <option value="gastronomia">Gastronomia</option>
            <option value="Naturaleza">Naturaleza y Aventura</option>
            <option value="VidaNocturna">Vida Nocturna</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceRange">Precio (por persona):</label>
          <select 
            id="priceRange" 
            value={priceRange} 
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="">Todos los rangos</option>
            <option value="1">$1 - $200</option>
            <option value="2">$201 - $600</option>
            <option value="3">$601 - $1200</option>
            <option value="4">Más de $1201</option>
          </select>
        </div>
        {/*<div>
          <label htmlFor="rating">Calificación mínima:</label>
          <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Seleccione una calificación</option>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{'★'.repeat(star)}</option>
            ))}
          </select>
        </div>*/}
        {showCheckboxes && (
          <div className="categories-column">
            <h3>Selecciona las categorías:</h3>
            <div className="checkbox-group">
              {availableCategories.map((categoria) => (
                                <label key={categoria}>
                                <input
                                  type="checkbox"
                                  value={categoria}
                                  onChange={handleCategoryChange}
                                  checked={selectedCategories.includes(categoria)}
                                />
                                {categoriasTraduccion[categoria]}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      <button type="submit" disabled={loading}>Buscar</button>
                    </form>
                    {loading && <p>Buscando...</p>}
                    {error && <p>{error}</p>}
                    {packages.length > 0 ? (
                      <div className="list-container">
                        {packages.map(pkg => (
                          <div key={pkg.id} className="list-item">
                            <img src={pkg.image} alt={pkg.title} className="package-image" />
                            <div className="package-info">
                              <h3>{pkg.title}</h3>
                              <p><strong>Calificación:</strong> {renderStars(pkg.rating)}</p>
                              <p><strong>Ubicación:</strong> {pkg.location}</p>
                              <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {noResults && <h1>No se encontraron resultados para tu búsqueda :(</h1>}

                      <div className="itinerary-container">
        <h2 className="itinerary-title">Itinerarios Generados</h2>
        {itinerarios.map((itinerario, index) => (
          <div key={index} className="itinerary-card">
            <button className="accordion-btn" onClick={() => toggleItinerary(index)}>
              {expandedItinerary === index ? 'Cerrar' : `Itinerario ${index + 1}`}
            </button>
            {expandedItinerary === index && (
              <div className="accordion-content">
                {itinerario.map((lugar) => (
                  <div key={lugar.id} className="itinerary-item">
                    <h4>{lugar.title}</h4>
                    <p>{lugar.location}</p>
                  </div>
                ))}
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
      
                  </div>
                );
              };
              
              export default LugaresCarrusel;              
