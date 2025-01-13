import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../estilos/CarouselOptions.css';
import axios from 'axios';
import "../estilos/DetalleLugar.css";
import fondiInicio from "../imgs/cdmx-portada.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";
import BotonRegresar from "../componentes/BotonRegresar";
import Cancun from "../imgs/citys/Cancun.png"
import Edimburgo from "../imgs/citys/Edimburgo.jpg"
import Guadalajara from "../imgs/citys/Guadalajara.png"
import Guanajuato from "../imgs/citys/Guanajuato.png"
import Madrid from "../imgs/citys/Madrid.png"
import Sydney from "../imgs/citys/Sydney.png"
import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01, Lugar1, Lugar2, Lugar3, Lugar4
} from "../imgs/ArchivoImgs";

const lugares = [
  {
    id: 1,
    titulo: "Guanajuato",
    descripcion:
      "Guanajuato, Ciudad Patrimonio de la Humanidad, es un destino mágico conocido por sus pintorescas callejuelas, coloridas fachadas y su rica historia minera. Entre sus atractivos destacan el Callejón del Beso, el Teatro Juárez, el Museo de las Momias, y la majestuosa Alhóndiga de Granaditas.",
    imagen: Guanajuato,
  },
  {
    id: 2,
    titulo: "Guadalajara",
    descripcion:
      "Guadalajara, la Perla Tapatía, es una ciudad vibrante y moderna con profundas raíces culturales. Es el hogar del mariachi y el tequila, símbolos icónicos de México. Entre sus principales atracciones destacan la imponente Catedral de Guadalajara, el histórico Teatro Degollado, y el dinámico Mercado San Juan de Dios.",
    imagen: Guadalajara,
  },
  {
    id: 3,
    titulo: "Cancún",
    descripcion:
      "Cancún, el paraíso del Caribe mexicano, es conocido por sus playas de arena blanca, aguas turquesa y vibrante vida nocturna. Este destino ofrece actividades para todos, desde explorar sitios arqueológicos mayas como El Rey y Tulum hasta disfrutar de resorts de clase mundial y emocionantes deportes acuáticos.",
    imagen: Cancun,
  },
  {
    id: 4,
    titulo: "Madrid",
    descripcion:
      "Madrid, el corazón vibrante de España, combina historia, cultura y modernidad en un solo lugar. La capital española es famosa por sus monumentos icónicos como el Palacio Real, la Puerta del Sol y la majestuosa Plaza Mayor. Sus museos de renombre mundial, como el Prado y el Reina Sofía, albergan obras maestras del arte.",
    imagen: Madrid,
  },
  {
    id: 5,
    titulo: "Edimburgo",
    descripcion:
      "la joya histórica de Escocia, es una ciudad de contrastes donde la majestuosidad medieval se encuentra con la elegancia georgiana. Dominada por el imponente Castillo de Edimburgo, la ciudad ofrece encantadores paseos por la Royal Mile y las misteriosas callejuelas del casco antiguo. Su vibrante vida cultural se destaca en festivales como el Edinburgh Festival Fringe. Con paisajes escénicos como el Arthur’s Seat y una rica herencia literaria, Edimburgo es un destino fascinante lleno de historia, arte y naturaleza.",
    imagen: Edimburgo,
  },
  {
    id: 6,
    titulo: "Sydney",
    descripcion:
      "la joya costera de Australia, es una ciudad icónica conocida por su deslumbrante puerto, hogar de la emblemática Ópera de Sídney y el majestuoso Puente del Puerto. Sus playas doradas, como Bondi y Manly, son perfectas para disfrutar del sol y el surf. Sídney combina modernidad y naturaleza con atracciones como los Jardines Botánicos Reales y la vasta Bahía de Sídney. Vibrante y multicultural, ofrece una rica gastronomía, vida nocturna y una experiencia urbana inolvidable en medio de paisajes espectaculares.",
    imagen: Sydney,
  },
];

const DetalleLugar = () => {
  const { id } = useParams(); // Ahora obtenemos el `id` desde la URL
  



  const location = useLocation();
  const navigate = useNavigate();
  const { titulo, descripcion, imagen } = location.state || {};


  const categorias = {
    gastronomia: [
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
      "wine_bar"
    ],
    Cultura: [
      "art_gallery", "art_studio", "auditorium", "cultural_landmark", "historical_place", "monument", 
      "museum", "sculpture", "historical_landmark", "library"
    ],
    ArteEntretenimiento: [
      "art_gallery", "art_studio", "auditorium", "cultural_landmark", "museum", "performing_arts_theater", 
      "sculpture", "library", "karaoke", "movie_theater", "opera_house", "philharmonic_hall", "planetarium"
    ],
    Naturaleza: [
      "adventure_sports_", "adventure_sports_center", "aquarium", "botanical_garden", "cycling_park", 
      "dance_hall", "dog_park", "ferris_wheel", "garden", "hiking_area", "historical_landmark", "national_park", 
      "off_roading_area", "skateboard_park", "state_park", "tourist_attraction", "water_park", "wildlife_park", 
      "wildlife_refuge", "zoo", "park", "roller_coaster", "beach"
    ],
    VidaNocturna: [
      "karaoke", "night_club", "bar", "liquor_store", "cafe", "cafeteria", "diner", "wine_bar"
    ],
    Compras: [
      "acai_shop", "bagel_shop", "bakery", "candy_store", "chocolate_factory", "chocolate_shop", "coffee_shop", 
      "confectionery", "dessert_shop", "donut_shop", "food_court", "ice_cream_shop", "juice_shop", "sandwich_shop", 
      "florist", "food_delivery", "asian_grocery_store", "book_store", "clothing_store", "convenience store", 
      "department_store", "discount_store", "food_store", "jewelry_store", "market", "shopping_mall", "supermarket", 
      "plaza", "wine_bar"
    ],
    FamiliaNinos: [
      "childrens_camp", "movie_theater", "tourist_attraction", "water_park", "wildlife_park", "wildlife_refuge", 
      "zoo", "shopping_mall", "store", "cycling_park", "park", "planetarium", "plaza", "roller_coaster", "beach"
    ],
    Deportes: [
      "adventure_sports_", "adventure_sports_center", "aquarium", "bowling_alley", "casino", "comedy_club", 
      "ferris_wheel", "observation_deck", "off_roading_area", "skateboard_park", "tourist_attraction", "water_park", 
      "video_arcade", "yoga_studio", "sauna", "cycling_park", "dance_hall", "park", "picnic_ground", "planetarium", 
      "plaza", "roller_coaster", "swimming_pool", "sports_activity_location", "sports_club", "playground"
    ]
  };

  const categoriasTraduccion = {
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
    "performing_arts_theater": "Teatro de Artes Escénicas",
    "movie_theater": "Cine",
    "opera_house": "Teatro de Ópera",
    "philharmonic_hall": "Sala Sinfónica",
    "planetarium": "Planetario",
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
    "karaoke": "karaoke",
    "night_club": "Discoteca",
    "liquor_store": "Tienda de Licores",
    "acai_shop": "Tienda de Acai",
    "bagel_shop": "Tienda de Bagels",
    "candy_store": "Tienda de Golosinas",
    "chocolate_factory": "Fábrica de Chocolate",
    "chocolate_shop": "Tienda de Chocolate",
    "confectionery": "Confitería",
    "dessert_shop": "Tienda de Postres",
    "donut_shop": "Tienda de Donas",
    "food_court": "Comedor de Comida Rápida",
    "juice_shop": "Tienda de Jugos",
    "sandwich_shop": "Tienda de Sandwiches",
    "florist": "Floristería",
    "food_delivery": "Servicio de Comida a Domicilio",
    "asian_grocery_store": "Tienda de Comestibles Asiáticos",
    "book_store": "Librería",
    "clothing_store": "Tienda de Ropa",
    "convenience_store": "Tienda de Conveniencia",
    "department_store": "Tienda Departamental",
    "discount_store": "Tienda de Descuentos",
    "food_store": "Tienda de Alimentos",
    "jewelry_store": "Joyería",
    "market": "Mercado",
    "shopping_mall": "Centro Comercial",
    "supermarket": "Supermercado",
    "plaza": "Plaza Comercial",
    "bowling_alley": "Bolera",
    "casino": "Casino",
    "comedy_club": "Club de Comedia",
    "observation_deck": "Plataforma de Observación",
    "off_roading_area": "Zona de Off-Roading",
    "tourist_attraction": "Atracción Turística",
    "video_arcade": "Arcade de Video",
    "yoga_studio": "Estudio de Yoga",
    "sauna": "Sauna",
    "picnic_ground": "Zona de Picnic",
    "swimming_pool": "Piscina",
    "sports_activity_location": "Ubicación de Actividades Deportivas",
    "sports_club": "Club Deportivo",
    "playground": "Parque Infantil"
  };

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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (categoria && categorias[categoria]) {
      setShowCheckboxes(true);
      setAvailableCategories(categorias[categoria]);
    } else {
      setShowCheckboxes(false);
      setAvailableCategories([]);
    }
  }, [categoria]);

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
      const categoriasParaBusqueda = selectedCategories.length > 0 ? selectedCategories : [categoria];
      let url = `http://localhost:3002/search?city=${titulo}&category=${categoriasParaBusqueda.join(",")}&radius=${radius}&keywords=${keywords}`;

      if (categoria !== 'museum' && priceRange && priceRange !== '4') {
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
        price: result.price_level !== undefined ? `Precio: ${result.price_level}` : "Precio no disponible",
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
    } catch (error) {
      setError('Ocurrió un error al realizar la búsqueda.');
    } finally {
      setLoading(false);
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

      navigate("/actividad", { state: placeData });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => <span key={index} className="star full">★</span>)}
        {halfStars && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, index) => <span key={index} className="star empty">☆</span>)}
      </div>
    );
  };

  return (
    <div className="contenedorVista">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${imagen})`,
          height: `90vh`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
        onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <BotonRegresar />
        </div>
        <div
        className="gradienteSuperpuesto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, #006d77, transparent)",
          opacity: isHovered ? 0 : 1, // Cambia la opacidad para la transición
          transition: "opacity 0.7s ease", // Transición suave de la opacidad
          borderRadius:"25px",
        }}
      ></div>
      {/* Capa del Gradiente */}
      <div
        className="gradienteSuperpuesto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, #e19577, transparent)",
          opacity: isHovered ? 1 : 0, // Cambia la opacidad para la transición
          transition: "opacity 0.7s ease", // Transición suave de la opacidad
          borderRadius:"25px",
        }}
      ></div>
        <div className="contenedorDos">
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <h2>Actividades</h2>
        <div className="carousel-container">
      <form onSubmit={handleSubmit}>
        <h2>Busca tu lugar favorito en {titulo}</h2>
       <p>Selecciona una categoria y un rango de precios</p>
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
          <label htmlFor="priceRange">Precio aproximado en pesos mexicanos:</label>
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
                              <p><strong>Ubicación:</strong> {pkg.location}</p>
                              <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {noResults && <h1>No se encontraron resultados para tu búsqueda :(</h1>}
                  </div>
      </section>

      <section>
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>
    </div>
  );
};

export default DetalleLugar;
