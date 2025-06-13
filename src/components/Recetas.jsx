import React, { useState ,useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal"

const Recetas = () => {
  // In production, the frontend and backend run on the same server
  // In development, use VITE_BACKEND_URL if provided, otherwise default to relative path
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  const urlRecetas = `${backendUrl}/api/usuarios/beli/recetas`;
  const [ recetas, setRecetas ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ newRecipe, setNewRecipe] = useState({})
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
  const campos =  ['name', 'descripcion', 'image', 'time', 'difficulty'];

  const createRecipe = async (newRecipe) => {
    try{
      setLoading(true);
      const createUrl = `${backendUrl}/api/usuarios/beli/recetas`; // Correct endpoint for creating recipes
      const additionalSettings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe) 
      };
      const resp = await fetch(createUrl, additionalSettings);
      const data = await resp.json()
      if (resp.ok) {
        
        setIsModalOpen(false);
        setNewRecipe({});
  
        setRecetas([ ...recetas, data])
      }
    } catch(err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    const loadRecipes = async () => {
      setLoading(true)
      try {
        const respuesta =  await fetch(urlRecetas);
        const data = await respuesta.json()
    
        console.log(data.recetas)
        setRecetas(data.recetas)
        
      } catch(err){
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRecipes();
  }, [urlRecetas] )

  return (
    <>
      <div className="text-black" style={{ minHeight: `calc(100vh - 12rem)` }}>
        <h2 className="text-4xl font-bold mx-8 my-2">Mis Recetas</h2>
        <div className="flex flex-wrap mx-4">
          {/* Recipe Cards */}
          { loading && <h1>...loading</h1>}
          {
            recetas.map( item => {
              return <RecipeCard key={item.id} receta={item} />
            })
          }

        </div>
      </div>
      <button className="sticky w-full bottom-0"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-12 h-12 bg-green-600 m-8 ml-auto rounded-full flex items-center justify-center">
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
      <Modal isOpen={isModalOpen} title={"Agregar una receta 💚"}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => createRecipe(newRecipe)}
      >
        {
          campos.map((campo, index) => {
            return (<div key={index} className="flex flex-col">
              <label className="font-bold">{campo}</label>
              <input className="text-green-800" placeholder={campo} value={newRecipe[campo] || ''}
                onChange={(event) => setNewRecipe({ ...newRecipe, [campo]: event.target.value })}
              />
            </div>
            )
          })
        }
      </Modal>
    </>
  );
};

export default Recetas;
