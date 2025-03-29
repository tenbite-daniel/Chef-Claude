export default function Main() {
    return (
        <main>
            <form className="add-ingredient">
                <input
                    type="text"
                    className="input-form"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                />
                <button>Add Ingredient</button>
            </form>
        </main>
    )
}