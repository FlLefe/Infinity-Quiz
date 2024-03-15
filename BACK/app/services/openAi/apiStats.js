import APIError from '../error/APIError.js';

/**
 * Calculates response statistics based on the provided data.
 * @param {Object} data - The data object containing the response statistics.
 * @param {number} data.prompt_tokens - The number of prompt tokens.
 * @param {number} data.completion_tokens - The number of completion tokens.
 * @param {number} data.total_tokens - The total number of tokens.
 * @returns {Object} - The response statistics object.
 * @throws {APIError} - If an error occurs during the calculation of response statistics.
 */
export default function responseStats(data) {
  try {
    const tokenPricePrompt = 0.001;
    const tokenPriceResponse = 0.002;

    // Calculate statistics based on the provided data
    const callApiStats = {
      promptTokens: parseInt(data.prompt_tokens, 10),
      responseTokens: parseInt(data.completion_tokens, 10),
      totalTokens: parseInt(data.total_tokens, 10),
      promptPrice: (parseInt(data.prompt_tokens, 10) / 1000) * tokenPricePrompt,
      responsePrice: (parseInt(data.completion_tokens, 10) / 1000) * tokenPriceResponse,
      /**
       * Calculates the total price of the response.
       * @returns {number} - The total price of the response.
       */
      get totalPrice() {
        return this.promptPrice + this.responsePrice;
      },
    };

    return callApiStats;
  } catch (error) {
    throw new APIError('Une erreur est survenue pendant le calcul des statistiques', 500);
  }
}
