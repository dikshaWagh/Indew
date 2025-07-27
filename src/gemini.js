// // src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"; // Replace this with your actual Gemini API key

// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// export const generateGeminiResponse = async (prompt) => {
//   try {
//     const result = await model.generateContent(prompt);
//     const response = result.response.text();
//     return response;
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Sorry, I couldn’t process that.";
//   }
// };

// gemini.js
// const GEMINI_API_KEY = "AIzaSyAS0OythtMGgajtIHQidbW1HHT0iFz36jA";

// export const generateGeminiResponse = async (userText) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: userText,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

    
//     const data = await response.json();
//     console.log("Gemini response data:", data);

//     const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     return reply || "No response received.";
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     return "Something went wrong with the Gemini request.";
//   }
// };

const GEMINI_API_KEY = "AIzaSyAS0OythtMGgajtIHQidbW1HHT0iFz36jA"; // replace with your actual key

export const generateGeminiResponse = async (userText) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userText,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "";
  }
};
