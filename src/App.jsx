async function getResponse() {

  if (prompt === "") {
    alert("Please enter a prompt!");
    return;
  }

  setData(prevData => [...prevData, { role: "user", content: prompt }])

  setScreen(2);

  setLoading(true);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  setData(prevData => [...prevData, { role: "ai", content: response.text }])

  setPrompt("");
  console.log(messages)
  setLoading(false);
}
