// eslint-disable-next-line no-unused-vars
import React, { useState }  from 'react';
import Modal from './Modal';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const fields = ['name', 'time', 'descripcion', 'image', 'difficulty', 'meat', 'origen'];

  const defaultRecipe = {
    image: "https://selloazul.ec/cdn/shop/articles/Arroz_Marinero_MINI_BLOG-01.png?v=1705528358"
  }

  const [newRecipe, setNewRecipe] = useState(defaultRecipe)


  const createRecipe = async (newRecipe) => {
    const user = `ernesto`;

    const resp = await fetch(`https://laughing-tribble-q97v49xrr6vh47qw-5001.app.github.dev/api/usuarios/${user}/recetas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe)
    })

    const data = await resp.json()

    if (resp.ok) {
      alert("Creada nueva receta")
      setIsOpen(false);
      setNewRecipe(defaultRecipe);
    }

    console.log(data)

    // y como hacemos que react atualize otro componente? que nisiquiera es su hijo?

    // useContext() --- tarea


  }

  return (
    <>
    <div className='flex flex-row h-16 justify-between p-8 items-center sticky top-0 z-[100] bg-green-600 w-full '>
        <h2 className='text-lg font-bold'>
            
        <i className='fa-solid fa-book mx-1'></i>COCINANDO CON ERNESTO
        </h2>
        <button onClick={ () => setIsOpen(!isOpen)}>
            <i className='fa-solid fa-bars'></i>
        </button>
    </div>
      <Modal title="Nueva Receta" isOpen={isOpen}
      
        onConfirm={() => createRecipe(newRecipe)}

        onClose={() => setIsOpen(false)}
      >

        {
          fields.map( campo => {

            return <div key={campo} className='space-x-4'>
                <label className=''>
                  {campo}
                </label>
                <input placeholder={campo} name={campo}
                    onChange={event => setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value })} 
                    value={newRecipe[campo] || "" }
                  />
              </div>
          })
        }
      </Modal>
    </>
  )
}

export default Navbar;