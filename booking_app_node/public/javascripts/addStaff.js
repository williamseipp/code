async function handleFormSubmit(event) {
  event.preventDefault();

  let form = event.target;
  let body = JSON.stringify(Object.entries((new FormData(form))));

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json '
      },
      body,
    });


    if (response.status === 201) {
      const data = await response.json();
      alert(`Successfully created staff with id: ${data.id}`)
    } else if (response.status === 400) {
      alert('Staff cannot be created. Check your inputs')
    }
  } catch (error) {
    console.error(error);
    alert('Network error. Please try again.');
  }

  form.reset();
}
document.querySelector('form').addEventListener('submit', handleFormSubmit);
