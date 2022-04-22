function checkPassword() {
  let password = document.getElementById('password').value;
  let cnfrmPassword = document.getElementById('confirm-pwd').value;
  // console.log(password, cnfrmPassword);
  let message = document.getElementById('message');

  if (password.length != 0) {
    if (password == cnfrmPassword) {
      message.textContent = 'Passwords match';
      message.style.backgroundColor = 'green';
    } else {
      message.textContent = "Password don't match";
      message.style.backgroundColor = 'red';
    }
  } else {
    alert("Password can't be empty");
    message.textContent = '';
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
    }).then(async function (response) {
      if (response.status === 200) {
        window.location.href = '/login';
      } else if (response.status === 400) {
        let data = await response.json();
        alert(data.message);
        return;
      } else {
        alert('Something went wrong. Please try again later...');
      }
    });
  });
};
