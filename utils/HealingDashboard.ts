import fs from "fs";

export class HealingDashboard {
  generate() {
    const testFile = "utils/test-results.json";
    const healingFile = "healing/healing-history.json";

    const testData = fs.existsSync(testFile)
      ? JSON.parse(fs.readFileSync(testFile, "utf-8"))
      : {
          total: 0,
          passed: 0,
          failed: 0,
          skipped: 0,
          duration: 0,
          tests: []
        };

    const healingData = fs.existsSync(healingFile)
      ? JSON.parse(fs.readFileSync(healingFile, "utf-8"))
      : [];

    const totalTests = testData.total;
    const passed = testData.passed;
    const failed = testData.failed;
    const skipped = testData.skipped;

    const totalHealing = healingData.length;
    const successfulHealing = healingData.length;

    // Failed healing is not tracked yet
    const failedHealing = 0;

    const healingRate =
      totalHealing === 0
        ? 0
        : Math.round(
            (successfulHealing / totalHealing) * 100
          );

    const duration = testData.duration;

    const seconds = (duration / 1000).toFixed(2);

    const testRows = testData.tests
      .map(
        (test: any) => `
        <tr>
          <td>${test.name}</td>
          <td>
            <span class="badge ${test.status}">
              ${test.status.toUpperCase()}
            </span>
          </td>
          <td>${test.duration} ms</td>
        </tr>
      `
      )
      .join("");

    const healingRows = healingData
      .slice()
      .reverse()
      .map(
        (item: any) => `
        <tr>
          <td>${item.element}</td>
          <td class="failed-locator">
            ${item.failedLocator}
          </td>
          <td class="working-locator">
            ${item.workingLocator}
          </td>
          <td>
            <span class="badge passed">
              HEALED
            </span>
          </td>
          <td>${new Date(item.time).toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    const healthItems = healingData
      .map(
        (item: any) => `
        <div class="health-item">
          <div class="health-icon">✓</div>

          <div>
            <div class="health-name">
              ${item.element}
            </div>

            <div class="health-text">
              Locator successfully recovered
            </div>
          </div>
        </div>
      `
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>QA Automation Dashboard</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  color: #1f2937;
}

.header {
  background: #111827;
  color: white;
  padding: 25px 40px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
}

.header p {
  margin: 7px 0 0;
  color: #9ca3af;
}

.container {
  padding: 30px 40px;
}

.section-title {
  margin: 30px 0 15px;
  font-size: 20px;
}

.cards {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(180px, 1fr));

  gap: 18px;
}

.card {
  background: white;
  padding: 22px;
  border-radius: 12px;

  box-shadow:
    0 3px 12px rgba(0,0,0,0.06);
}

.card-title {
  font-size: 13px;
  color: #6b7280;
}

.card-value {
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}

.card-info {
  margin-top: 5px;
  font-size: 12px;
  color: #9ca3af;
}

.grid {
  display: grid;
  grid-template-columns:
    1fr 1fr;

  gap: 20px;
}

.panel {
  background: white;
  padding: 24px;
  border-radius: 12px;

  box-shadow:
    0 3px 12px rgba(0,0,0,0.06);
}

.panel h2 {
  margin-top: 0;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 13px;
  background: #f3f4f6;
  font-size: 13px;
}

td {
  padding: 13px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
}

.badge {
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
}

.passed {
  background: #dcfce7;
  color: #15803d;
}

.failed {
  background: #fee2e2;
  color: #b91c1c;
}

.skipped {
  background: #fef3c7;
  color: #92400e;
}

.failed-locator {
  color: #dc2626;
}

.working-locator {
  color: #16a34a;
}

.health-item {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 15px 0;

  border-bottom:
    1px solid #e5e7eb;
}

.health-icon {
  width: 32px;
  height: 32px;

  border-radius: 50%;

  background: #dcfce7;
  color: #15803d;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
}

.health-name {
  font-weight: bold;
}

.health-text {
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
}

.empty {
  color: #9ca3af;
  padding: 20px 0;
}

.footer {
  margin-top: 30px;
  color: #9ca3af;
  font-size: 12px;
}

@media(max-width: 900px) {

  .cards {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .grid {
    grid-template-columns: 1fr;
  }

}

</style>

</head>

<body>

<div class="header">

  <h1>🛡 QA Automation Dashboard</h1>

  <p>
    Self-Healing Playwright Automation Framework
  </p>

</div>


<div class="container">


<h2 class="section-title">
Test Execution
</h2>


<div class="cards">


<div class="card">

  <div class="card-title">
    Total Tests
  </div>

  <div class="card-value">
    ${totalTests}
  </div>

</div>


<div class="card">

  <div class="card-title">
    Passed
  </div>

  <div class="card-value">
    ${passed}
  </div>

</div>


<div class="card">

  <div class="card-title">
    Failed
  </div>

  <div class="card-value">
    ${failed}
  </div>

</div>


<div class="card">

  <div class="card-title">
    Skipped
  </div>

  <div class="card-value">
    ${skipped}
  </div>

</div>


</div>


<div class="cards" style="margin-top:18px">


<div class="card">

  <div class="card-title">
    Total Healing Attempts
  </div>

  <div class="card-value">
    ${totalHealing}
  </div>

</div>


<div class="card">

  <div class="card-title">
    Successfully Healed
  </div>

  <div class="card-value">
    ${successfulHealing}
  </div>

</div>


<div class="card">

  <div class="card-title">
    Failed Healing
  </div>

  <div class="card-value">
    ${failedHealing}
  </div>

  <div class="card-info">
    Failure tracking coming next
  </div>

</div>


<div class="card">

  <div class="card-title">
    Healing Success Rate
  </div>

  <div class="card-value">
    ${healingRate}%
  </div>

</div>


</div>


<h2 class="section-title">
Execution Overview
</h2>


<div class="grid">


<div class="panel">

<h2>Test Results</h2>

${
  testData.tests.length === 0
    ? `<div class="empty">
        No test results available.
       </div>`
    : `
<table>

<tr>
  <th>Test</th>
  <th>Status</th>
  <th>Duration</th>
</tr>

${testRows}

</table>
`
}

</div>


<div class="panel">

<h2>Locator Health</h2>

${
  healingData.length === 0
    ? `<div class="empty">
        No healing events recorded.
       </div>`
    : healthItems
}

</div>


</div>


<h2 class="section-title">
Recent Healing Events
</h2>


<div class="panel">

${
  healingData.length === 0
    ? `<div class="empty">
        No healing events recorded.
       </div>`
    : `
<table>

<tr>
  <th>Element</th>
  <th>Failed Locator</th>
  <th>Working Locator</th>
  <th>Status</th>
  <th>Time</th>
</tr>

${healingRows}

</table>
`
}

</div>


<div class="footer">

Total execution duration:
<strong>${seconds}s</strong>

</div>


</div>

</body>

</html>
`;

    fs.writeFileSync(
      "reports/healing-dashboard.html",
      html
    );

    console.log(
      "✅ QA dashboard generated: reports/healing-dashboard.html"
    );
  }
}