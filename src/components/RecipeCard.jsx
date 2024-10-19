// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const RecipeCard = ({ receta }) => {
  return (
    <>
        <img
          src={receta.image}
          alt={receta.imageAlt}
          className="w-full object-cover object-center  aspect-square lg:h-full lg:w-full rounded-md"
        />
        <div className="flex flex-col truncate">
          <div className="text-md text-gray-700">
            <span className="text-lg font-bold">{receta.name}</span>
            <div className="flex flex-wrap space-x-2">
              { receta.meat && receta.meat != undefined && <i className="fa-solid fa-drumstick-bite text-amber-600"></i> }
              { receta.vegan && <i className="fa-solid fa-seedling text-green-500"></i> }
              { receta.spicy && <i className="fa-solid fa-pepper-hot text-red-500"></i> }
              { receta.fish && <i className="fa-solid fa-fish text-blue-500"></i> }
            </div>
          <p className="mt-1 text-sm text-gray-800">
            <i className="fa-solid fa-stopwatch text-gray-400"></i> {receta.time} <i className="fa-solid fa-kitchen-set text-red-500"></i> {receta.difficulty}{" "}
          </p>
          </div>
        </div>
    </>
  );
};


RecipeCard.propTypes = {

  receta: PropTypes.object
  
}

export default RecipeCard;
