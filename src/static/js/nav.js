let dropdownButton = document.querySelector("img#dropdown-button");
let navLinks = document.querySelector(".buildforsdgs-nav-links");
let dropdownState = false;
let rotationState = 0;

dropdownButton.addEventListener('click', () => {
  rotationState += 180;
  dropdownState = !dropdownState;
  dropdownState ? navLinks.style.display = "flex" : navLinks.style.display = "none";
  
  if (dropdownState) {
    for(let i = 0; i < navLinks.childElementCount; i++){
      let child = (navLinks.children)[i];
      navLinks.style.width = "100%";
      child.style.display = "block";
      child.style.width = "100%";
    }
  } else {
    for(let i = 0; i < navLinks.childElementCount; i++){
      let child = (navLinks.children)[i];
      navLinks.style.width = "auto";
      child.style.display = "inline-block";
      child.style.width = "auto";
    }
  }
  dropdownButton.style.transform = `rotate(${rotationState}deg)`;
  // setTimeout(() => dropdownButton.style.transform = "", 500);
})