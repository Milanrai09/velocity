import React, { useState } from "react";

const Deployments = () => {
  const [text, setText] = useState("");

  async function handleSubmit() {
    console.log("Sending:", text);

    const res = await fetch("http://localhost:9000/api/build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",   // sending JSON
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <div>
      <div className="bg-amber-900 h-[50vh] w-screen">
        <input
          className="bg-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL"
        />

        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Deployments;
