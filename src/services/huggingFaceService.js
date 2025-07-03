const HUGGINGFACE_API_KEY = "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";
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models";
// Model for sentiment analysis
const SENTIMENT_MODEL = "distilbert-base-uncased-finetuned-sst-2-english";
// Model for text classification
const CLASSIFICATION_MODEL = "facebook/bart-large-mnli";
/**
 * Analyze the sentiment of text
 * @param {string} text - The text to analyze
 * @returns {Promise} - Promise with sentiment score
 */
export const analyzeSentiment = async text => {
  try {
    const response = await fetch(`${HUGGINGFACE_API_URL}/${SENTIMENT_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: text
      })
    });
    if (!response.ok) {
      throw new Error("Sentiment analysis failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    // Return default data for demo purposes
    return [{
      label: "POSITIVE",
      score: 0.75
    }];
  }
};
/**
 * Classify text against given labels
 * @param {string} text - The text to classify
 * @param {Array} labels - Array of classification labels
 * @returns {Promise} - Promise with classification results
 */
export const classifyText = async (text, labels) => {
  try {
    const inputs = labels.map(label => ({
      text,
      candidate_label: label
    }));
    const results = await Promise.all(inputs.map(async input => {
      const response = await fetch(`${HUGGINGFACE_API_URL}/${CLASSIFICATION_MODEL}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      if (!response.ok) {
        throw new Error("Classification failed");
      }
      return response.json();
    }));
    return results;
  } catch (error) {
    console.error("Error classifying text:", error);
    // Return default data for demo purposes
    return labels.map(label => ({
      sequence: text,
      labels: [label],
      scores: [0.7]
    }));
  }
};
/**
 * Analyze product description for quality metrics
 * @param {string} productDescription - The product description
 * @returns {Promise} - Promise with narrative score
 */
export const analyzeProductNarrative = async productDescription => {
  try {
    // Step 1: Analyze sentiment
    const sentimentResult = await analyzeSentiment(productDescription);
    // Step 2: Classify against important startup narrative qualities
    const narrativeLabels = ["innovative", "scalable", "market-focused", "problem-solving", "unique value proposition"];
    const classificationResults = await classifyText(productDescription, narrativeLabels);
    // Step 3: Calculate narrative score
    // This is a simplified scoring algorithm for demo purposes
    const sentimentScore = sentimentResult[0].label === "POSITIVE" ? sentimentResult[0].score * 100 : 100 - sentimentResult[0].score * 100;
    const classificationScores = classificationResults.map(result => result.scores[0] * 100);
    const avgClassificationScore = classificationScores.reduce((a, b) => a + b, 0) / classificationScores.length;
    // Weighted score: 30% sentiment, 70% classification
    const narrativeScore = Math.round(sentimentScore * 0.3 + avgClassificationScore * 0.7);
    return {
      score: narrativeScore,
      sentiment: sentimentResult,
      classifications: classificationResults.map((result, index) => ({
        label: narrativeLabels[index],
        score: result.scores[0]
      }))
    };
  } catch (error) {
    console.error("Error analyzing narrative:", error);
    // Return a fallback score for demo purposes
    return {
      score: 85,
      sentiment: null,
      classifications: null
    };
  }
};