async function generate() {
  const userStory = document.getElementById("userStory").value;

  const res = await fetch("/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userStory })
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.testCode;
}

async function runTests() {
  const res = await fetch("/run-tests", { method: "POST" });
  const data = await res.json();

  document.getElementById("output").innerText = data.raw;

  document.getElementById("stats").innerHTML = `
    ✅ Passed: ${data.stats.passed} <br>
    ❌ Failed: ${data.stats.failed}
  `;
}

function viewReport() {
  window.open("/report", "_blank");
}