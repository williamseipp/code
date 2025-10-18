let scheduleContainer;
let btnAdd;
let form;
let staffs;
let scheduleCount = 0;

async function fetchStaffMembers() {
  const response = await fetch('/api/staff_members');
  return response.json();
}


function scheduleTemplate() {
  const staffOptions = staffs.map(({ id, name }) =>
    `<option value="${id}">${name}</option>`).join('');

  return `
    <fieldset id="schedule_${scheduleCount}">
      <legend>Schedule ${scheduleCount}</legend>

      <div>
        <label for="staff_${scheduleCount}">Staff Name :</label>
        <select id="staff_${scheduleCount}" name="staff_${scheduleCount}">${staffOptions}</select>
      </div>

      <div>
        <label for="date_${scheduleCount}">Date :</label>
        <input type="text" id="date_${scheduleCount}" name="date_${scheduleCount}" placeholder="mm-dd-yy">
      </div>

      <div>
        <label for="time_${scheduleCount}">Time:</label>
        <input type="text" id="time_${scheduleCount}" name="time_${scheduleCount}" placeholder="hh:mm">
      </div>

    </fieldset>`;
}


function addSchedule() {
  scheduleCount += 1;
  const scheduleHTML = scheduleTemplate();
  scheduleContainer.insertAdjacentHTML('beforeend', scheduleHTML);
}

// convert form inputs to JSON
function formInputsToJson(form) {
  const json = [];
  for (let i = 0; i < scheduleCount; i += 1) {
    json.push({
      staff_id: form[`staff_${i + 1}`].value,
      date: form[`date_${i + 1}`].value,
      time: form[`time_${i + 1}`].value,
    })
  }

  return { schedules: json };
}

// handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  const json = JSON.stringify(formInputsToJson(event.target));

  const response = await fetch(event.target.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json
  });

  if (response.status === 201) form.reset();
  alert(await response.text());
}

async function main() {
  scheduleContainer = document.getElementById('schedules');
  btnAdd = document.getElementById('btnAdd');
  form = document.querySelector('form');

  staffs = await fetchStaffMembers();

  addSchedule();

  btnAdd.addEventListener('click', event => {
    event.preventDefault();
    addSchedule();
  });

  form.addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', main);
