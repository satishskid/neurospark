// Debug script to test Groq API directly
import Groq from "groq-sdk";

async function testGroq() {
  const testKey = "gsk_test"; // Replace with actual test key when testing
  
  console.log("Testing Groq API with key:", testKey.substring(0, 8) + "...");
  
  try {
    const groq = new Groq({ 
      apiKey: testKey,
      dangerouslyAllowBrowser: true 
    });
    
    console.log("Making test request...");
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Hello' if you can hear me." }],
      model: "llama3-8b-8192",
      max_tokens: 10,
      temperature: 0,
    });
    
    console.log("Response:", response);
    console.log("Text:", response.choices[0]?.message?.content);
    
  } catch (error) {
    console.error("Error:", error);
    console.error("Error message:", error?.message);
    console.error("Error status:", error?.status);
    console.error("Error details:", error?.error || error?.response?.data);
  }
}

// Uncomment to test:
// testGroq();

console.log("Debug script loaded. Call testGroq() with a valid key to test.");
