import React, { useState, useEffect } from "react";
import "../estilos/carrouselCategorias.css";
import FichaCategoria from "./FichaCategoria";

const CarrouselCategorias = ({ categorias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fichasPorBloque, setFichasPorBloque] = useState(4); // Predeterminado para pantallas grandes
  const [groupedCategorias, setGroupedCategorias] = useState([]);

  // Actualiza el número de fichas visibles según el ancho de la pantalla
  const updateBloques = () => {
    const width = window.innerWidth;

    let fichasVisibles;
    if (width <= 600) {
      fichasVisibles = 1;
    } else if (width <= 900) {
      fichasVisibles = 2;
    } else if (width <= 1200) {
      fichasVisibles = 3;
    } else {
      fichasVisibles = 4;
    }

    setFichasPorBloque(fichasVisibles);

    // Reagrupa las categorías
    const newGroupedCategorias = [];
    for (let i = 0; i < categorias.length; i += fichasVisibles) {
      newGroupedCategorias.push(categorias.slice(i, i + fichasVisibles));
    }
    setGroupedCategorias(newGroupedCategorias);
  };

  // Ejecuta la función al montar y cuando cambia el tamaño de la ventana
  useEffect(() => {
    updateBloques();
    window.addEventListener("resize", updateBloques);
    return () => window.removeEventListener("resize", updateBloques);
  }, [categorias]);

  // Cambia automáticamente el índice del carrusel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedCategorias.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [groupedCategorias]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedCategorias.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + groupedCategorias.length) % groupedCategorias.length
    );
  };

  return (
    <div className="carrousel">
      {/* Botón izquierdo */}
      <button className="carrousel-nav carrousel-nav-left" onClick={handlePrev}>
        &#8592;
      </button>

      <div
        className="carrousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groupedCategorias.map((group, index) => (
          <div key={index} className="carrousel-group">
            <div
              className={`carrousel-item ${group.length === 2 ? "centro" : ""}`}
            >
              {group.map((categoria, idx) => (
                <FichaCategoria
                  key={idx}
                  titulo={categoria.titulo}
                  contenido={categoria.contenido}
                  imagen={categoria.imagen}
                  categoria={categoria.categoria}
                  className="ficha-en-carrousel"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón derecho */}
      <button className="carrousel-nav carrousel-nav-right" onClick={handleNext}>
        &#8594;
      </button>

      {/* Indicadores */}
      <div className="carrousel-indicators">
        {groupedCategorias.map((_, index) => (
          <div
            key={index}
            className={`carrousel-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarrouselCategorias;
