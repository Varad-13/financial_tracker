// utils/getFinancialAdvice.js
// Function to fetch user-specific data (mocked for this example)

import { HfInference } from '@huggingface/inference'

const client = new HfInference("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")

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD 
      - Expenses: ${totalSpend} USD 
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    // Send the prompt to the OpenAI API
    const chatCompletion = await client.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.7
    });
    
    // Process and return the response
    const advice = chatCompletion.choices[0].message.content;

    console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
