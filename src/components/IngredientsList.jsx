export default function IngredientsList(props) {

    const ingredientListItems = props.ingredients.map((ingredient, index) => {
        return (
            <>
                <div>
                    <li key={index}>{ingredient}</li>
                    <button onClick={() => props.deleteIngredient(ingredient)}>X</button>
                </div>
            </>

        )
    });


    return (
        <section className="ingredients-on-hand">
            <h2>Ingredients on hand:</h2>
            <ul>{ingredientListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a Recipe</button>
            </div>}
        </section>
    )
}