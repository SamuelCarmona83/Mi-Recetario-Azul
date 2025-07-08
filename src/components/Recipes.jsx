import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {

    const user = "ernesto";

    const [recipes, setRecipes] = useState([]);

    
    useEffect(() => {
        const getRecipes = async () => {

            try {
                let resp = await fetch(`https://laughing-tribble-q97v49xrr6vh47qw-5001.app.github.dev/api/usuarios/${user}/recetas`);
                let data = await resp.json();
                setRecipes(data.recetas);
            } catch (err) {
                console.log(err);
            }
        }
        getRecipes();
    },[user])

    return <>
        <div className="text-black">
            {
                recipes.map(item => {
                    
                    return <RecipeCard key={item.id} receta={item} />

                })
            }
        </div>
    </>

}

export default Recipes;