import { renderForm } from "./components/form.js";
import { renderDashboard } from "./components/dashboard.js";

let records = [];

export function addRecord(record) {
  records.push(record);
  renderDashboard(records);
}

renderForm();
renderDashboard(records);