import { useState, useEffect, useRef } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai";

export default function Main() {

    const [ingredients, setIngredients] = useState([]);

    const [recipe, setRecipe] = useState("");
    
    const recipeSection = useRef(null);

    useEffect(() => {
        if(recipe !== "" && recipeSection !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"});
        }
    }, [recipe])
    function deleteIngredient(deleteIngredient) {
        const newIngredients = ingredients.filter(ingredient => {
            return ingredient !== deleteIngredient;
        })
        setIngredients(newIngredients)
    }


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    async function getRecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients);
        setRecipe(generatedRecipe);
    }
    return (
        <main>
            <form action={addIngredient} className="add-ingredient">
                <input
                    type="text"
                    className="input-form"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList 
                    ref={recipeSection}
                    ingredients={ingredients} 
                    getRecipe={getRecipe} 
                    deleteIngredient={deleteIngredient} 
                />
            }

            {recipe &&
                <ClaudeRecipe recipe={recipe} />
            }

        </main>
    );
}
