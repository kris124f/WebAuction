document.addEventListener("DOMContentLoaded", function () {
  var inputField = document.querySelector(".input");

  // Sætter standardværdi til inputfeltet til at være et plus-symbol
  inputField.value = "+";

  inputField.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
});

// Det Malene har sent
// DOM queries:
const input = document.querySelector(".productCard__input");
const button = document.querySelector(".productCard__button");

button.addEventListener("click", () => {
  // Convert the value from a string to a number
  const value = Number(input.value);

  // check if value in inputfield is not empty:
  if (value != "") {
    // check if the number is dividable with 1.000:
    // ref. for the remainder operator %:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
    const x = value % 1000;

    if (x != 0) {
      alert("Du skal byde et tal deleligt med 1000");
    } else {
      alert("Bud på " + value + " er modtaget");
    }
  } else {
    alert("Skriv et tal inden du klikker på Tryk");
  }
});

// changes the images
