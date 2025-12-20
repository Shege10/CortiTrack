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
    <div class="card">
      <form id="patientForm">

        <div class="form-group">
          <label>First Name</label>
          <input type="text" id="fname" required />
        </div>

        <div class="form-group">
          <label>Age</label>
          <input type="number" id="age" min="1" max="120" />
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text" id="lname" required />
        </div>

        <div class="form-group">
          <label>Weight (kg)</label>
          <input type="number" id="weight" min="1" step="0.1" />
        </div>

        <div class="form-group">
          <label>Height (cm)</label>
          <input type="number" id="height" min="30" step="0.1" />
        </div>

        <div class="form-group">
          <label>Sleep (hrs)</label>
          <input type="number" id="sleep" min="0" step="0.1" />
        </div>

        <div class="form-group">
          <label>Stress (1–10)</label>
          <input type="number" id="stress" min="1" max="10" />
        </div>

        <div class="form-group">
          <label>Morning Cortisol</label>
          <input type="number" id="cort_m" min="0" step="0.01" />
        </div>

        <div class="form-group">
          <label>Afternoon Cortisol</label>
          <input type="number" id="cort_pm" min="0" step="0.01" />
        </div>

        <div class="form-group full-width">
          <label>Cholesterol (mg/dL)</label>
          <input type="number" id="chol" min="0" step="0.1" />
        </div>

        <button type="submit" class="full-width">Add Record</button>

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