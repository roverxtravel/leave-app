document.getElementById('leave-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const reason = document.getElementById('reason').value;

  // TODO: Replace with your Google API call
  console.log({ name, from, to, reason });

  document.getElementById('status').textContent = 'Submitted!';
  e.target.reset();
});
