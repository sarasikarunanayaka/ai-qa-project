import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import fs from "fs";
import { generateTestCases } from "../ai/generateTests.js";

dotenv.config();

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ================= API =================

// Generate tests
app.post("/generate", async (req, res) => {
  try {
    const { userStory } = req.body;

    const code = await generateTestCases(userStory);

    res.json({ success: true, testCode: code });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Run tests + stats
app.post("/run-tests", (req, res) => {
  exec("npx playwright test --reporter=json", (error, stdout, stderr) => {

    let stats = { passed: 0, failed: 0 };

    try {
      const json = JSON.parse(stdout);

      json.suites?.forEach(suite => {
        suite.specs?.forEach(spec => {
          spec.tests?.forEach(test => {
            test.results?.forEach(r => {
              if (r.status === "passed") stats.passed++;
              if (r.status === "failed") stats.failed++;
            });
          });
        });
      });

    } catch (e) {
      console.log("Parse error:", e);
    }

    res.json({
      success: !error,
      stats,
      raw: stdout || stderr
    });
  });
});

// Serve report
app.get("/report", (req, res) => {
  const reportPath = path.join(__dirname, "../playwright-report/index.html");

  if (fs.existsSync(reportPath)) {
    res.sendFile(reportPath);
  } else {
    res.send("Run tests first to generate report.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});