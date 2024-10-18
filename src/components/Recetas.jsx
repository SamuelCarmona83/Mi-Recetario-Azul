import React from "react";

const Recetas = () => {


  return (
    <>
      <div style={{ minHeight: `calc(100vh - 12rem)` }}>
        <h2 className="text-2xl font-bold text-black mx-8 my-2">My Recipes</h2>
        <div className="flex flex-wrap">
          {/* Recipe Cards */}
        </div>
      </div>
      <button className="sticky w-full bottom-0">
        <div className="w-12 h-12 bg-red-500 m-8 ml-auto rounded-full flex items-center justify-center">
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
    </>
  );
};

export default Recetas;
