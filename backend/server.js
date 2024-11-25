const express = require("express");
const cors = require("cors"); 
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();


app.use(cors()); 
app.use(express.json());

const sandboxDir = path.join(__dirname, "sandbox/user-scripts");

// Ensure the directory exists
if (!fs.existsSync(sandboxDir)) {
  fs.mkdirSync(sandboxDir, { recursive: true });
}

app.post("/api/run", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ output: "No code provided." });
  }

  const scriptFile = path.join(sandboxDir, "script.sh");

 
  fs.writeFileSync(scriptFile, code, { mode: 0o755 });

  exec(`bash ${scriptFile}`, (error, stdout, stderr) => {
    if (error || stderr) {
      return res.status(400).json({ output: stderr || error.message });
    }
    res.json({ output: stdout });
  });
});

app.get("/", (req, res) => {
  res.send("CLI Portfolio Backend is Running");
});

app.listen(8080, () => console.log("Backend running on http://backend:8080"));
