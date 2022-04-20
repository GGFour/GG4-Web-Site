window.onload = () => {
  fetch("api/personalInfo")
    .then((response) => {
      if (response.status === 200) {
        document.querySelector(".signinup-btns").style.display = "none";
        document.querySelector(".signed-user-icon").style.display = "flex";
        return response.json();
      }
      return;
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".signed-user-icon h3").innerText = (
        data.firstname.charAt(0) + data.lastname.charAt(0)
      ).toUpperCase();
    });
};
