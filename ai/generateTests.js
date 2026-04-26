import ollama from "ollama";
import fs from "fs";
import path from "path";

const testFilePath = path.resolve("./tests/generated.spec.js");

export async function generateTestCases(userStory) {
  try {
    const response = await ollama.chat({
      model: "llama3",
      messages: [
        {
          role: "user",
          content: `
Generate Playwright test scripts in JavaScript.

User story:
${userStory}

Rules:
- Only code
- Must include: import { test, expect }
- Include positive, negative, edge cases
- Use full URL like https://example.com
- No explanations
`
        }
      ]
    });

    let code = response.message.content
      .replace(/```javascript/g, "")
      .replace(/```/g, "")
      .trim();

    if (!code.includes("test(")) {
      code = `
import { test, expect } from '@playwright/test';

test('fallback test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
`;
    }

    fs.writeFileSync(testFilePath, code);

    return code;

  } catch (err) {
    throw new Error("AI generation failed");
  }
}