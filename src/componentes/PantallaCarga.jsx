import React from 'react';
import '../estilos/styLS.css';

const PantallaCarga = ({ message = "Cargando... la chota que te pario" }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default PantallaCarga;
