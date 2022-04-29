fetch("api/personalInfo")
  .then((response) => {
    if (response.status === 200) {
      document.querySelector(".signinup-btns").style.display = "none";
      document.querySelector(".signed-user-icon").style.display = "flex";
      return response.json();
    } else {
      document.querySelector(".right-nav-btns").classList.remove("hide");
    }
    return;
  })
  .then((data) => {
    // console.log(data);
    document.querySelector(".signed-user-icon h3").innerText = (
      data.firstname.charAt(0) + data.lastname.charAt(0)
    ).toUpperCase();
    document.querySelector(".user-container .profile-header").innerText =
      data.firstname + " " + data.lastname;
    document.querySelector(".user-container .user-img h1").innerText = (
      data.firstname.charAt(0) + data.lastname.charAt(0)
    ).toUpperCase();
    document.querySelector(".user-container p").innerText =
      "#" + String(data.id).padStart(6, "0");
    document.querySelector(".user-container #popup-email").value = data.email;
    document.querySelector(".user-container #popup-username").value =
      data.username;
    document.querySelector(".user-container #popup-balance").value =
      data.coins + " ø";
    document.querySelector(".user-container #popup-highscore").value =
      data.highscore || window.localStorage.getItem("highscore") || "0";
  });
