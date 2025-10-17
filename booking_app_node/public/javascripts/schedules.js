async function fetchWithTimeout() {
  alert(`api/schedules is the endpoint`)
}

function main() {
  let scheduleButton = document.getElementById('get-schedules');
  scheduleButton.addEventListener('click', fetchWithTimeout);
}

document.addEventListener('DOMContentLoaded', main);
