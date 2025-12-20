import { renderForm } from "./form.js";
import { renderDashboard } from "./dashboard.js";

let records = [];

export function addRecord(record) {
  records.push(record);
  renderDashboard(records);
}

renderForm();
renderDashboard(records);