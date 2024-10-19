import React, { useState ,useEffect } from "react";
import RecipeCard from "./RecipeCard";

const Recetas = () => {
  const urlRecetas = `https://miniature-memory-6r9v5rp6qp6f5gx9-5001.app.github.dev/usuarios/Beli/recetas`;
  const [ recetas, setRecetas ] = useState([])
  useEffect( () => {

    fetch(urlRecetas)
      .then( respuesta => {
        return respuesta.json();
      })
      .then(data => {
        console.log(data); // data.recetas [] <---
        setRecetas(data.recetas)
      })
      .catch( error => {
        console.log(error)
      })

  }, [] )

  return (
    <>
      <div className="text-black" style={{ minHeight: `calc(100vh - 12rem)` }}>
        <h2 className="text-4xl font-bold mx-8 my-2">Mis Recetas</h2>
        <div className="flex flex-wrap mx-4">
          {/* Recipe Cards */}

          {
            recetas.map( item => {
              return <RecipeCard key={item.id} receta={item} />
            })
          }

        </div>
      </div>
      <button className="sticky w-full bottom-0">
        <div className="w-12 h-12 bg-green-600 m-8 ml-auto rounded-full flex items-center justify-center">
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
    </>
  );
};

export default Recetas;
