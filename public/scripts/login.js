//          LOG IN PAGE

const myFormLog = document.getElementById('myForm-log');

myFormLog.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const allowCookies =
    window.localStorage.getItem('allowCookies') ||
    (await confirm(
      'By pressing OK you grant us permission to use functional cookies on your browser'
    ));
  if (!allowCookies) {
    alert("Can't login without permission to use cookies");
    return;
  }
  window.localStorage.setItem('allowCookies', true);

  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
  }).then(async function (response) {
    if (response.status === 200) {
      window.location.href = '/';
    } else if (response.status === 400) {
      let data = await response.json();
      alert(data.message);
      return;
    } else {
      alert('Something went wrong. Please try again later...');
    }
  });
});

// Double Arrow Button
