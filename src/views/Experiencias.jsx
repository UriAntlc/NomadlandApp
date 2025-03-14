import React, { useState, useEffect } from 'react';
import axios from "axios";
import historia from "../imgs/historia.jpg"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";

// Componente para calificar con estrellas
function StarRating({ rating, onRate }) {
  const stars = Array(5).fill(0);
  
  return (
    //Rating opinion
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {stars.map((_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            color: index < rating ? '#FFD700' : '#ccc',
            fontSize: '20px',
          }}
          onClick={() => onRate(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Componente principal de Experiencias
export default function Experiencias() {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };
    
    fetchPerfil();
  }, []);
  
  // Función para agregar una nueva opinión
  const agregarOpinion = async (e) => {
    e.preventDefault();
    try {
      const data ={
        comentario: comentario,
      };
      await axios.post("http://localhost:3001/opiniones/publicar", data, {
        withCredentials: true,
      });
      alert("Opinion publicada correctamente");
      navigate("/Perfil"); // Redirige al perfil después de 
      console.log({data});
    } catch (error) {
      console.error("Error al publicar experiencia:", error);
      alert("Hubo un problema al publicar la experiencia");
    }
  };

  return (
    
    <div style={{
      display: 'flex',
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      color: '#00363A',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      
      {/* Imagen de fondo de toda la sección */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${historia})`, // Usa la imagen importada
        backgroundSize: 'cover', // Ajusta la imagen para que cubra sin recortes
        backgroundPosition: 'center',
        opacity: 0.2, // Ajusta la opacidad sin desenfoque
        zIndex: 1,
      }}></div>

      {/* Contenido de la sección con opiniones y formulario */}
      <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Sección de opiniones */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2 style={{ color: '#00363A' }}>Opiniones de otros usuarios</h2>
        </div>
        
        {/* Formulario de opinión */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: 'rgba(0, 109, 119, 0.7)', // Fondo del formulario
          borderRadius: '8px',
        }}>
          <h2 style={{ color: '#ffffff' }}>Agrega tu opinión</h2>
          
          <div style={{ width: '80%', margin: '0 auto' }}>
            <input
              type="text"
              name="nombre"
              placeholder={usuario.nombre} 
              onChange={(e) => setUsuario(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #8FB8B8',
              }}
            />
            <input
              type="text"
              name="comentario"
              className="input-field"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Comentario"
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #8FB8B8',
              }}
            />
            <StarRating rating={rating} onRate={setRating} />
          </div>

          <button
            onClick={agregarOpinion}
            style={{
              marginTop: '10px',
              padding: '10px 15px',
              backgroundColor: '#006D77',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold', // Texto en negritas
            }}
          >
            Enviar opinión
          </button>
        </div>
      </div>
    </div>
  );
}
