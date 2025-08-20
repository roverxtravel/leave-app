// Auto-calc total days (inclusive)
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const daysEl = document.getElementById('days');
function calcDays() {
  const f = fromEl.value ? new Date(fromEl.value) : null;
  const t = toEl.value ? new Date(toEl.value) : null;
  if (f && t && t >= f) {
    const diff = Math.round((t - f) / (1000*60*60*24)) + 1; // inclusive
    daysEl.value = diff;
  } else {
    daysEl.value = '';
  }
}
fromEl.addEventListener('change', calcDays);
toEl.addEventListener('change', calcDays);

// Submit (replace GAS_URL with your Apps Script Web App URL if needed)
const form = document.getElementById('leave-form');
const statusEl = document.getElementById('status');

// OPTIONAL: paste your Apps Script web app URL here
const GAS_URL = ""; // e.g. "https://script.google.com/macros/s/AKfycbx.../exec"

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const data = new FormData(form); // handles file if provided
  statusEl.textContent = "Submitting…";

  try {
    if (GAS_URL) {
      const res = await fetch(GAS_URL, { method: 'POST', body: data });
      if (!res.ok) throw new Error('Network error');
      const msg = await res.text();
      statusEl.textContent = msg || "Submitted ✔";
    } else {
      // Demo path (no backend yet)
      console.log(Object.fromEntries(data.entries()));
      statusEl.textContent = "Submitted ✔ (demo)";
    }
    form.reset();
    daysEl.value = "";
  } catch (err) {
    statusEl.textContent = "Failed to submit. Try again.";
  }
});
