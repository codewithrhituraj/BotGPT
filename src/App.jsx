import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import Markdown from "react-markdown";
import { RiComputerFill } from "react-icons/ri";
import { GiOpenBook, GiWhiteBook } from "react-icons/gi";
import { FaBloggerB } from "react-icons/fa";
import { motion } from "framer-motion";

const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: "AIzaSyAHqbnn8TP-WyQvK4JU_3tKwx04O7CbgY8" });

  const [data, setData] = useState([]);

  async function getResponse() {
    if (prompt.trim() === "") {
      alert("Please enter a prompt!");
      return;
    }

    setData((prev) => [...prev, { role: "user", content: prompt }]);
    setScreen(2);
    setLoading(true);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setData((prev) => [...prev, { role: "ai", content: response.text }]);
    setPrompt("");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Navbar />

      {/* ================= HERO SCREEN ================= */}
      {screen === 1 && (
        <div className="flex flex-col items-center justify-center h-[75vh] px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            BotGPT
          </motion.h1>

          <p className="mt-4 text-gray-300 text-lg max-w-xl">
            Your AI assistant for coding, writing, stories & blogs. Ask anything.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
          >
            <Card icon={<RiComputerFill />} text="Create a website using HTML, CSS & JS" />
            <Card icon={<GiWhiteBook />} text="Write a book on coding" />
            <Card icon={<GiOpenBook />} text="Tell me a comedy story" />
            <Card icon={<FaBloggerB />} text="Create a blog on web development" />
          </motion.div>
        </div>
      )}

      {/* ================= CHAT SCREEN ================= */}
      {screen === 2 && (
        <div className="h-[70vh] overflow-y-auto px-4 md:px-32 py-6 space-y-6">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`max-w-[80%] md:max-w-[50%] p-4 rounded-xl shadow-lg backdrop-blur-lg ${
                item.role === "user"
                  ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600"
                  : "mr-auto bg-gradient-to-r from-gray-700 to-gray-800"
              }`}
            >
              <p className="text-sm text-gray-200 mb-1">
                {item.role === "user" ? "You" : "BotGPT"}
              </p>
              <Markdown>{item.content}</Markdown>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-center">
              <BeatLoader color="#fff" />
            </div>
          )}
        </div>
      )}

      {/* ================= INPUT BOX ================= */}
      <div className="w-full px-4 md:px-32 py-6">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-3 shadow-2xl">
          <input
            onKeyDown={(e) => e.key === "Enter" && getResponse()}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent outline-none text-lg text-white placeholder-gray-300 px-3"
          />
          <button
            onClick={getResponse}
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            Send
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          BotGPT may make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  );
};

const Card = ({ icon, text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-purple-500/30 transition-all"
    >
      <div className="text-4xl mb-3 text-purple-400">{icon}</div>
      <p className="text-gray-200">{text}</p>
    </motion.div>
  );
};

export default App;
