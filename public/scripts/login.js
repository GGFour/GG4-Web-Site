//          LOG IN PAGE

const myFormLog = document.getElementById('myForm-log');

myFormLog.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      console.log(text);
    })
    .catch(function (error) {
      console.error(error);
    });
});
