function checkPassword() {
  let password = document.getElementById('password').value;
  let cnfrmPassword = document.getElementById('confirm-pwd').value;
  console.log(password, cnfrmPassword);
  let message = document.getElementById('message');

  if (password.length != 0) {
    if (password == cnfrmPassword) {
      message.textContent = 'Password match';
    } else {
      message.textContent = "Password don't match";
    }
  }
}

window.onload = function () {
  const myFormSign = document.getElementById('myForm-sign');

  myFormSign.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
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
};
