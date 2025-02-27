// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express(); // Esta línea define el objeto 'app'
const port = 3002;

app.use(cors());

// Ruta para búsqueda de lugares
app.get('/search', async (req, res) => {
    const { city, radius, category, priceRange, rating, keywords, lessKnown, nonTourist } = req.query;
    const apiKey = '';  // Cambia esto con tu propia API key
    //claves AIzaSyCLdO6CWXFW4ShsSI0zc7QVrJGOH8Er_5k, AIzaSyDHXFKn_4RXx7aajRVb0lqr5SDXuLFp8SU, AIzaSyCEj5HsivhghX7r_o31Z9FKo7HaQblM6WU

    try {
        // Construir el término de búsqueda para la API
        let query = city;
        if (category) query += ` ${category}`;
        if (keywords) query += ` ${keywords}`;

        // Construir la URL para la solicitud a Google Places API
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

        // Añadir parámetros opcionales
        if (radius) url += `&radius=${parseInt(radius) * 1000}`; // Google API requiere el radio en metros
        if (priceRange) url += `&minprice=${priceRange}&maxprice=${priceRange}`;

        const response = await axios.get(url);
        let places = response.data.results;

        // Filtrar por rating mínimo si está especificado
        if (rating) {
            places = places.filter(place => place.rating >= parseFloat(rating));
        }

        // Lugares menos conocidos (menor cantidad de reseñas)
        if (lessKnown === 'true') {
            places = places.filter(place => place.user_ratings_total < 50);
        }

        // Filtro adicional para zonas no turísticas (esto depende de la dirección del lugar)
        if (nonTourist === 'true') {
            places = places.filter(place => !place.formatted_address.toLowerCase().includes("turístico"));
        }

        // Devolver los resultados al cliente
        const results = places.map(place => ({
            place_id: place.place_id,
            name: place.name,
            formatted_address: place.formatted_address,
            vicinity: place.vicinity,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            price_level: place.price_level,
            photo_reference: place.photos ? place.photos[0].photo_reference : null,
            opening_hours: place.opening_hours,
        }));

        res.json({ results });
    } catch (error) {
        console.error('Error al realizar la solicitud a Google Places API:', error);
        res.status(500).send('Error al realizar la búsqueda');
    }
});

// Nueva ruta para obtener detalles de un lugar específico usando place_id
app.get('/place-details', async (req, res) => {
    const { place_id } = req.query;
    const apiKey = '';

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,rating,reviews,photos,opening_hours,website&key=${apiKey}`;
        const response = await axios.get(url);

        res.json(response.data.result);
    } catch (error) {
        console.error('Error al obtener detalles del lugar:', error);
        res.status(500).send('Error al obtener detalles del lugar');
    }
});
app.get('/place-directions', async (req, res) => {
    const { place_id } = req.query;
    const apiKey = '';

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=formatted_address&key=${apiKey}`;
        const response = await axios.get(url);

        res.json(response.data.result);
    } catch (error) {
        console.error('Error al obtener detalles del lugar:', error);
        res.status(500).send('Error al obtener detalles del lugar');
    }
});


// Ruta para obtener una imagen de un lugar
// server.js - Endpoint para obtener la foto del lugar
app.get('/place-photo', async (req, res) => {
    const { photo_reference } = req.query;
    const apiKey = '';
  
    try {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=300&photoreference=${photo_reference}&key=${apiKey}`;
      const response = await axios.get(url, {
        responseType: 'arraybuffer', // Necesario para obtener la imagen en forma de buffer
      });
  
      // Configurar los headers para indicar que es una imagen
      res.set('Content-Type', 'image/jpeg');
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener la imagen');
    }
  });
  

// Ruta para obtener reseñas de un lugar

app.get('/place-reviews', async (req, res) => {
    const { place_id, pagetoken } = req.query;
    const apiKey = '';

    try {
        let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,reviews&language=es&key=${apiKey}`;
        if (pagetoken) {
            url += `&pagetoken=${pagetoken}`;
        }

        const response = await axios.get(url);
        const reviews = response.data.result.reviews || [];

        res.json(reviews);
    } catch (error) {
        console.error('Error al obtener reseñas del lugar:', error);
        res.status(500).send('Error al obtener reseñas del lugar');
    }
});


//API wikipedia para descripciones
app.get('/place-description', async (req, res) => {
    const { place_name, exchars } = req.query;

    if (!place_name) {
        return res.status(400).send('El parámetro "place_name" es requerido.');
    }

    try {
        const directUrl = `https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&titles=${encodeURIComponent(place_name)}&prop=extracts&exintro=true&explaintext=true&exchars=${exchars}`;
        let response = await axios.get(directUrl);
        let pages = response.data.query.pages;
        let page = pages[Object.keys(pages)[0]];

        let description = page.extract || null;

        if (!description) {
            const searchUrl = `https://es.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${encodeURIComponent(place_name)}&utf8=`;
            response = await axios.get(searchUrl);

            if (response.data.query.search.length > 0) {
                const firstResultTitle = response.data.query.search[0].title;
                const fallbackUrl = `https://es.wikipedia.org/w/api.php?origin=*&action=query&format=json&titles=${encodeURIComponent(firstResultTitle)}&prop=extracts&exintro=true&explaintext=true&exchars=${exchars}`;
                const fallbackResponse = await axios.get(fallbackUrl);
                
                pages = fallbackResponse.data.query.pages;
                page = pages[Object.keys(pages)[0]];
                description = page.extract || "Descripción no disponible";
            } else {
                description = "Descripción no disponible";
            }
        }

        res.json({ description });
    } catch (error) {
        console.error('Error al obtener la descripción del lugar desde Wikipedia:', error);
        res.status(500).send('Error al obtener la descripción del lugar');
    }
});


app.get('/route-matrix', async (req, res) => {
    const { origins, destinations } = req.query;
    const apiKey = '';
    const formattedOrigins = `place_id:${origins}`;
    const formattedDestinations = destinations.split('|').map(id => `place_id:${id}`).join('|');
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${formattedOrigins}&destinations=${formattedDestinations}&key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status !== 'OK') {
        throw new Error(data.error_message || 'Error fetching data from Google API');
      }
  
      // Obtener direcciones formateadas
      const placeIds = [origins, ...destinations.split('|')];
      const placeDetails = await Promise.all(placeIds.map(async (placeId) => {
        const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        const placeResponse = await fetch(placeUrl);
        const placeData = await placeResponse.json();
        return {
          name: placeData.result.name,
          formatted_address: placeData.result.formatted_address
        };
      }));
  
      res.json({ ...data, placeDetails });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
