// Cortisol Interpretation
export function interpretCortisol(am, pm) {
  let morningStatus = (am >= 138 && am <= 690) ? "Cortisol Rhythm Normal (AM)" : "Possible Adrenal Dysregulation (AM)";
  let afternoonStatus = (pm >= 83 && pm <= 359) ? "Cortisol Rhythm Normal (PM)" : "Possible Adrenal Dysregulation (PM)";
  return `${morningStatus} / ${afternoonStatus}`;
}

// Cholesterol Interpretation
export function interpretCholesterol(chol) {
  if (chol < 200) return "Normal";
  if (chol <= 239) return "Borderline High";
  return "High";
}

// Sleep Interpretation
export function interpretSleep(hours) {
  return hours >= 7 && hours <= 9
    ? "Healthy Sleep Range"
    : "Unhealthy Sleep Range";
}

// Simulated ML Model
export function simulateModel() {
  const predictions = ["Viral Pattern", "Defense Response", "Normal"];
  return predictions[Math.floor(Math.random() * predictions.length)];
}

// Convert any string into a proper JS Date first.
function parseDate(value) {
  // If the value is already a Date, return it
  if (value instanceof Date) return value;

  // Try to parse common formats (YYYY-MM-DD, MM/DD/YYYY, etc.)
  const parsed = new Date(value);

  // If parsing fails, return null to avoid breaking CSV
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Returns "03/12/2025" (DD/MM/YYYY)
export function formatDate(value) {
  const d = parseDate(value);
  if (!d) return value;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

// Returns "12:08 PM"
export function formatTime(value) {
  const d = parseDate(value);
  if (!d) return value; // fallback

  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}