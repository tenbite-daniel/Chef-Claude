import { useState } from "react"

export default function Main() {

    const [ingredients, setIngredients] = useState([]);
    const ingredientListItems = ingredients.map(ingredient => {
        return (
            <>
                <div>
                    <li key="ingredient">{ingredient}</li>
                    <button>X</button>
                </div>
            </>

        )
    });

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
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

            {ingredients.length ? <section className="ingredients-on-hand">
                <h2>Ingredients on hand:</h2>
                <ul>{ingredientListItems}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a Recipe</button>
                </div>}
            </section> : null}

        </main>
    );
}