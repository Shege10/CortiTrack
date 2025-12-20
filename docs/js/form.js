// BMI CATEGORY FUNCTION
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

import { addRecord } from "./main.js";
import { 
  interpretCortisol, 
  interpretCholesterol, 
  interpretSleep, 
  simulateModel,
  formatDate,
  formatTime
} from "./utils.js";

export function renderForm() {
  document.getElementById("form-container").innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Enter Patient Data</h2>

      <form id="patientForm" class="space-y-4">

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input required type="text" id="fname" class="w-full p-2 border rounded" />
          </div>

          <div>
            <label>Last Name</label>
            <input required type="text" id="lname" class="w-full p-2 border rounded" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <label>Age</label>
            <input type="number" id="age" class="w-full p-2 border rounded" min="1" max="120" />
          </div>

          <div>
            <label>Weight (kg)</label>
            <input type="number" id="weight" class="w-full p-2 border rounded" min="1" max="300" step="0.1" />
          </div>

          <div>
            <label>Height (cm)</label>
            <input type="number" id="height" class="w-full p-2 border rounded" min="30" max="250" step="0.1" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Sleep (hrs)</label>
            <input type="number" id="sleep" class="w-full p-2 border rounded" min="0" max="24" step="0.1" />
          </div>

          <div>
            <label>Stress (1–10)</label>
            <input type="number" id="stress" class="w-full p-2 border rounded" min="1" max="10" step="1" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Morning Cortisol</label>
            <input type="number" required id="cort_m" class="w-full p-2 border rounded" min="0" step="0.01" />
          </div>

          <div>
            <label>Afternoon Cortisol</label>
            <input type="number" required id="cort_pm" class="w-full p-2 border rounded" min="0" step="0.01" />
          </div>
        </div>

        <div>
          <label>Cholesterol (mg/dL)</label>
          <input type="number" id="chol" class="w-full p-2 border rounded" min="0" step="0.1" />
        </div>

        <button class="bg-pink-600 text-white px-4 py-2 rounded" type="submit">
          Add Record
        </button>

      </form>
    </div>
  `;

  document.getElementById("patientForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const fnameVal = fname.value.trim();
    const lnameVal = lname.value.trim();
    const ageVal = Number(age.value);
    const weightVal = Number(weight.value);
    const heightVal = Number(height.value);
    const sleepVal = Number(sleep.value);
    const stressVal = Number(stress.value);
    const cortMVal = Number(cort_m.value);
    const cortPMVal = Number(cort_pm.value);
    const cholVal = Number(chol.value);

    const heightMeters = heightVal / 100;
    const bmi = Number((weightVal / (heightMeters * heightMeters)).toFixed(1));
    const bmiCategory = getBMICategory(bmi);

    const now = new Date();
    const dateRecorded = formatDate(now);
    const timeRecorded = formatTime(now);

    const record = {
      id: "P-" + Date.now().toString().slice(-6),
      dateRecorded,
      timeRecorded,
      fname: fnameVal,
      lname: lnameVal,
      age: ageVal,
      weight: weightVal,
      height: heightVal,
      bmi,
      bmiCategory,
      sleep: sleepVal,
      sleepStatus: interpretSleep(sleepVal),
      stress: stressVal,
      cort_m: cortMVal,
      cort_pm: cortPMVal,
      cortisolStatus: interpretCortisol(cortMVal, cortPMVal),
      cholesterol: cholVal,
      cholStatus: interpretCholesterol(cholVal),
      modelPrediction: simulateModel()
    };

    addRecord(record);
    e.target.reset();
  });
}