import React, { useState } from "react";
import "./CLI.css"; 

const CLI = () => {
  const [output, setOutput] = useState(["Welcome to my portfolio!",
    "Type 'help' to see this message.",
  ]);
  const [command, setCommand] = useState("");
  const [isCodeEditorVisible, setIsCodeEditorVisible] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeOutput, setCodeOutput] = useState("");

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();

    switch (command) {
      case "help":
        setOutput([
          ...output,
          "- Type 'help' to see this message.",
          "- Type 'projects' to see the list of projects.",
          "- Type 'code' to write and run a script.",
          "- Type 'clear' to clear the terminal.",
          "- Type 'about' to learn more about me.",
          "- Type 'contact' to get my contact information.",
        ]);
        break;

      case "projects":
        setOutput([
          ...output,
          "Here are some of my projects:",
          "1. Project A - https://github.com/username/project-a",
          "2. Project B - https://github.com/username/project-b",
        ]);
        break;

      case "code":
        setOutput([
          ...output,
          "Opening the code editor...",
          "Type your Bash script below and click 'Run' to see the output.",
        ]);
        setIsCodeEditorVisible(true);
        break;

      case "clear":
        setOutput([]);
        setIsCodeEditorVisible(false);
        setCodeOutput("");
        break;

      case "about":
        setOutput([
          ...output,
          "I am a passionate developer with experience in React, Node.js, and various web technologies.",
          "I enjoy building projects that solve real-world problems and showcase my skills.",
          "You can check out my portfolio and projects here.",
        ]);
        break;

      case "contact":
        setOutput([
          ...output,
          "You can contact me via email: aryansehgal3212@gmail.com",
          "Or check my linktr.ee: https://linktr.ee/Aryan.x_x",
        ]);
        break;

      default:
        setOutput([...output, `Command not recognized: ${cmd}`]);
    }
  };

  const handleRunCode = () => {
    fetch("https://cli-resume.onrender.com/api/run", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput }), 
    })
      .then((res) => res.json())
      .then((data) => setCodeOutput(data.output))
      .catch((err) => setCodeOutput(`Error: ${err.message}`));
  };

  return (
    <div className="cli-container">
      <div className="header">
        <img
          src={require("../assets/aryan.jpg")}
          alt="Profile"
          className="profile-pic"
        />
        <button
          className="hire-button"
          onClick={() => window.open("https://www.linkedin.com/in/ryana-dev-062197252/")}
        >
          Hire Me
        </button>
      </div>
      <div className="cli">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div>
          ${" "}
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(command);
                setCommand("");
              }
            }}
            className="cmd-input"
          />
        </div>
      </div>

      {isCodeEditorVisible && (
        <div className="code-editor">
          <textarea
            rows="10"
            cols="50"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Write your Bash script here..."
          />
          <button onClick={handleRunCode}>Run</button>
          <pre>{codeOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default CLI;
