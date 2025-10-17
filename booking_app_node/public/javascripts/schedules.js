async function fetchWithTimeout() {
  let url = 'api/schedules';
  let timeout = 5000;

  let fetchPromise = fetch(url);
  let timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout)
  });

  try {
    let response = await Promise.race([fetchPromise, timeoutPromise]);
    let json = await response.json();

    if (json.length === 0) {
      alert('currently, no schedules are available for booking.');
    } else {
      const tally = {};

      json.forEach(schedule => {
        tally[schedule.staff_id] ?
          tally[schedule.staff_id]++ : tally[schedule.staff_id] = 1;
      })

      Object.keys(tally).forEach(key => {
        alert(`staff ${key}: schedules: ${tally[key]}`);
      });
    }
  } catch (error) {
    alert(error.message);
  } finally {
    alert('Operation completed.');
  }
}

function main() {
  let scheduleButton = document.getElementById('get-schedules');
  scheduleButton.addEventListener('click', fetchWithTimeout);
}

document.addEventListener('DOMContentLoaded', main);
