(function() {
  let burgerMenu = document.querySelector(".burgerMenu");
  let mainNav = document.querySelector(".mainNav");
  burgerMenu.addEventListener("click", function() {
    if (this.classList.contains("animateBurger")) {
      this.setAttribute("class", "burgerMenu");
      mainNav.setAttribute("class", "mainNav");
    } else {
      this.setAttribute("class", "burgerMenu animateBurger");
      mainNav.setAttribute("class", "mainNav slideMenu");
    }
  });
})();
