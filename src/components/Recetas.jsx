import React, { useState ,useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal"

const Recetas = () => {
  const urlRecetas = `https://miniature-memory-6r9v5rp6qp6f5gx9-5001.app.github.dev/usuarios/Beli/recetas`;
  const [ recetas, setRecetas ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ newRecipe, setNewRecipe] = useState({}) // <--- objeto vacio
  const [ isModalOpen, setIsModalOpen ] = useState(true);
  
  const campos =  ['name', 'descripcion', 'image', 'time', 'difficulty'];

  useEffect(() => { // <--- Acá no se puede definir async
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
        onConfirm={() => console.log(newRecipe)}
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
