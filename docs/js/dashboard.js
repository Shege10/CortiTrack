export function renderDashboard(records) {
  const container = document.getElementById("dashboard");

  if (records.length === 0) {
    container.innerHTML = "<p class='empty-state'>No records yet.</p>";
    return;
  }

  const rows = records
    .map(
      (r) => `
      <tr>
        <td>${r.dateRecorded}</td>
        <td>${r.timeRecorded}</td>
        <td>${r.fname} ${r.lname}</td>
        <td>${r.age}</td>
        <td>${r.weight} kg</td>
        <td>${r.height} cm</td>
        <td>${r.bmi} (${r.bmiCategory})</td>
        <td>${r.cort_m}</td>
        <td>${r.cort_pm}</td>
        <td>${r.cortisolStatus}</td>
        <td>${r.cholesterol} (${r.cholStatus})</td>
        <td>${r.sleep} hrs (${r.sleepStatus})</td>
        <td>${r.modelPrediction}</td>
      </tr>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="card">
      <button id="exportBtn">Export CSV</button>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Date Recorded</th>
              <th>Time Recorded</th>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Height</th>
              <th>BMI (Category)</th>
              <th>Cort AM</th>
              <th>Cort PM</th>
              <th>Cortisol Status</th>
              <th>Cholesterol</th>
              <th>Sleep</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("exportBtn").onclick = () => exportCSV(records);
}

function exportCSV(records) {
  const header = [
    "dateRecorded",
    "timeRecorded",
    "fname",
    "lname",
    "age",
    "weight",
    "height",
    "bmi",
    "bmiCategory",
    "cort_m",
    "cort_pm",
    "cortisolStatus",
    "cholesterol",
    "cholStatus",
    "sleep",
    "sleepStatus",
    "modelPrediction"
  ].join(",");

  const rows = records
    .map((r) => {
      return [
        r.dateRecorded,
        r.timeRecorded,
        r.fname,
        r.lname,
        r.age,
        r.weight,
        r.height,
        r.bmi,
        r.bmiCategory,
        r.cort_m,
        r.cort_pm,
        `"${r.cortisolStatus}"`,
        r.cholesterol,
        r.cholStatus,
        r.sleep,
        `"${r.sleepStatus}"`,
        `"${r.modelPrediction}"`
      ].join(",");
    })
    .join("\n");

  const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cortisol_records.csv";
  a.click();
}