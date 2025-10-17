async function fetchWithTimeout() {
  let url = 'api/schedules';
  let response = await fetch(url);
  let json = await response.json();
  const tally = {};

  json.forEach(schedule => {
    tally[schedule.staff_id] ?
      tally[schedule.staff_id]++ : tally[schedule.staff_id] = 1;
  })

  Object.keys(tally).forEach(key => {
    alert(`staff ${key}: schedules: ${tally[key]}`);
  });
}

function main() {
  let scheduleButton = document.getElementById('get-schedules');
  scheduleButton.addEventListener('click', fetchWithTimeout);
}

document.addEventListener('DOMContentLoaded', main);
