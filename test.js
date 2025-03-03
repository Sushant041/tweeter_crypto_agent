const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios"); // Import Axios for API requests

const API_URL = "https://multiagent.aixblock.io/api/v1/execute/result/67c49df7d8cd8338d94d47b8"; // API endpoint
const HEADERS = { "Content-Type": "application/json" };

const results = [];

// Read CSV file
fs.createReadStream("crypto_tweets.csv")
  .pipe(csv())
  .on("data", (row) => {
    results.push({
      Tweet_count: row.Tweet_count,
      Username: row.Username,
      Text: row.Text,
    });
  })
  .on("end", async () => {
    console.log("CSV File Loaded Successfully!");
    console.log(results); // Output the parsed data

    // Prepare the full request payload
    const requestData = {
      tweets_data: results, // Send entire array at once
      whale_activity: "example_value",
      market_trend: "example_value",
      news_impact_factor: "example_value",
      engagement_score: "example_value",
      sentiment_score: "example_value",
      crypto_mentions: "example_value",
      webhook: "https://2427-2409-40d7-ae-3b27-f2d0-7f40-5047-2715.ngrok-free.app/webhook",}

    try {
      // Send all tweets + additional data in one request
      const response = await axios.post(API_URL, requestData, { headers: HEADERS });
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  })
  .on("error", (err) => {
    console.error("Error reading CSV file:", err);
  });
