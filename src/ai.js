import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has 
and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe 
can include additional ingredients they didn't mention, but try not to include 
too many extra ingredients. Format your response in markdown to make it easier 
to render to a web page`

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {

    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content || "No recipe found."
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("402") || err.message.includes("Payment Required") || err.message.includes("Subscribe")) {
            return (
                "Recipe Generation Unavaliable\n\n" +
                "Unfortunately, we've reached the monthly limit for generating recipes using our free AI service.\n\n" +
                "What This Means:\n" +
                "- We use a free AI API to generate recipes\n" +
                "- This API has a limited number of free requests per month.\n" +
                "- Right now, we've used up all the avaliable requests.\n\n" +
                "What You Can Do:\n" +
                "- Check back at the begining of next month when the limit resets.\n" +
                "- Try looking up recipes manually baased on your ingredients.\n\n" +
                "Thank you for your patience!"
            );
        }
        return "An error occured while fetching the recipe. Please try again later."
    }
}