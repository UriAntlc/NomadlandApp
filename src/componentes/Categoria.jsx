import React, { useState } from "react";  
import categoriaImage from "../imgs/cat_art.jpg";  
import '../estilos/styCate.css';  

const Categoria = ({ titulo, contenido, imagen }) => {  
  const [isHovered, setIsHovered] = useState(false);
  return (  
    <div className="container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      >
      <div className="imagenContenedor">  
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
          transition: "opacity 0.3s ease", // Transición suave de la opacidad
          borderRadius: "25px",
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
          transition: "opacity 0.3s ease", // Transición suave de la opacidad
          borderRadius: "25px",
        }}
      ></div> 
        <img src={imagen || categoriaImage} alt="Categoría" className="categoriaImagen" />  
        <div className="textoImagen">
          <h2>{titulo || "Categoría"}</h2> {/* Mostrar el título recibido */}
          <p>{contenido || "Info Categoría"}</p> {/* Mostrar el contenido recibido */}
        </div> 
      </div>  
    </div>  
  );  
};  

export default Categoria;
