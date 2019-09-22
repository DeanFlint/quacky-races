(function() {
  let burgerMenu = document.querySelector(".burgerMenu");
  let mainNav = document.querySelector(".mainNav");
  let mobileLoginIcon = document.querySelector(".mobileLoginIcon");
  let loginArea = document.querySelector(".loginArea");

  burgerMenu.addEventListener("click", function() {
    if (this.classList.contains("animateBurger")) {
      this.setAttribute("class", "burgerMenu");
      mainNav.setAttribute("class", "mainNav");
    } else {
      resetLogin();
      this.setAttribute("class", "burgerMenu animateBurger");
      mainNav.setAttribute("class", "mainNav slideMenu");
    }
  });

  mobileLoginIcon.addEventListener("click", function() {
    if (this.classList.contains("animateLogin")) {
      this.setAttribute("class", "mobileLoginIcon");
      loginArea.setAttribute("class", "loginArea");
    } else {
      resetBurger();
      this.setAttribute("class", "mobileLoginIcon animateLogin");
      loginArea.setAttribute("class", "loginArea slideLogin");
    }
  });

  const resetBurger = function() {
    burgerMenu.setAttribute("class", "burgerMenu");
    mainNav.setAttribute("class", "mainNav");
  }

  const resetLogin = function() {
    mobileLoginIcon.setAttribute("class", "mobileLoginIcon");
    loginArea.setAttribute("class", "loginArea");
  }

})();
