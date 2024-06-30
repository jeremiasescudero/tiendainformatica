import { Link } from "react-router-dom";
import React from 'react';     //necesaria en stackblitz 
function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Tienda Informatica</h1>
      <p>Venta de articulos de computacion</p>
    </div>
  );
}
export { Inicio };