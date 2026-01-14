import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });

  async function sendPrompt() {
    if (prompt.trim() === "") {
      alert("Please type something");
      return;
    }

    const userText = prompt;
    setPrompt("");

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userText,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: response.text }
      ]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check API key.");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>BotGPT</h2>

      <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}
          </p>
        ))}

        {loading && <p><i>Typing...</i></p>}
      </div>

      <input
        type="text"
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
        style={{ width: "70%", padding: "8px" }}
      />

      <button onClick={sendPrompt} style={{ padding: "8px 15px", marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
