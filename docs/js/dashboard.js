
export function renderDashboard(records) {
  const container = document.getElementById("dashboard");

  if (records.length === 0) {
    container.innerHTML = "<p>No records yet.</p>";
    return;
  }

  const rows = records
    .map(
      (r) => `
      <tr class="border-b">
        <td class="p-2 whitespace-nowrap">${r.dateRecorded}</td>
        <td class="p-2 whitespace-nowrap">${r.timeRecorded}</td>
        <td class="p-2 whitespace-nowrap">${r.fname} ${r.lname}</td>
        <td class="p-2 whitespace-nowrap">${r.age}</td>
        <td class="p-2 whitespace-nowrap">${r.weight} kg</td>
        <td class="p-2 whitespace-nowrap">${r.height} cm</td>
        <td class="p-2 whitespace-nowrap">${r.bmi} (${r.bmiCategory})</td>
        <td class="p-2 whitespace-nowrap">${r.cort_m}</td>
        <td class="p-2 whitespace-nowrap">${r.cort_pm}</td>
        <td class="p-2 whitespace-nowrap">${r.cortisolStatus}</td>
        <td class="p-2 whitespace-nowrap">${r.cholesterol} (${r.cholStatus})</td>
        <td class="p-2 whitespace-nowrap">${r.sleep} hrs (${r.sleepStatus})</td>
        <td class="p-2 whitespace-nowrap">${r.modelPrediction}</td>
      </tr>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="bg-white p-4 rounded shadow">
      <button class="mb-4 bg-pink-600 text-white px-4 py-2 rounded" id="exportBtn">
        Export CSV
      </button>
  
      <div class="overflow-x-auto w-full">
        <table class="min-w-max table-auto border-collapse">
          <thead class="font-bold border-b">
            <tr>
              <th class="p-2 whitespace-nowrap">Date Recorded</th>
              <th class="p-2 whitespace-nowrap">Time Recorded</th>
              <th class="p-2 whitespace-nowrap">Name</th>
              <th class="p-2 whitespace-nowrap">Age</th>
              <th class="p-2 whitespace-nowrap">Weight</th>
              <th class="p-2 whitespace-nowrap">Height</th>
              <th class="p-2 whitespace-nowrap">BMI (Category)</th>
              <th class="p-2 whitespace-nowrap">Cort AM</th>
              <th class="p-2 whitespace-nowrap">Cort PM</th>
              <th class="p-2 whitespace-nowrap">Cortisol Status</th>
              <th class="p-2 whitespace-nowrap">Cholesterol</th>
              <th class="p-2 whitespace-nowrap">Sleep</th>
              <th class="p-2 whitespace-nowrap">Model</th>
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
        r.dateRecorded,      // already formatted correctly
        r.timeRecorded,      // already formatted correctly
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