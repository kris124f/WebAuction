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

function Item(itemId, title, description, startPrice, actualPrice, expires, active) {
  this.itemId = itemId;
  this.title = title;
  this.description = description;
  this.startPrice = startPrice;
  this.actualPrice = actualPrice;
  this.expires = expires;
  this.active = active;
}
function bid(Username,itemId,value)
{
  this.Username = Username
  this.itemId = itemId
  this.value = value
}
fetch('http://127.0.0.1:3000/items/all')
    .then(response => response.json())
    .then((items) => {
        items.forEach((item, index) => {
            const article = document.querySelectorAll('.productCard')[index];

            if (article) {
                // Populate the article with data from the item
                article.querySelector('.productCard__brand').textContent = item.title;
                article.querySelector('.productCard__description').textContent = item.description;
                article.querySelector('.productCard__timeLeft').textContent = `Time left: ${new Date(item.expires).toLocaleString()}`;
                article.querySelector('.productCard__currentPrice').textContent = `${item.actualPrice} DKK`;

                // Assuming 'item.image' contains the base64 image data
                if (item.image) {
                    const img = article.querySelector('.productCard__image');
                    img.src = item.image;
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
function test(){
  fetch('http://127.0.0.1:3000/items/all')
    .then(response => response.json())
    .then((items) => {
        items.forEach((item, index) => {
            const article = document.querySelectorAll('.productCard')[index];

            if (article) {
                // Populate the article with data from the item
                article.querySelector('.productCard__brand').textContent = item.title;
                article.querySelector('.productCard__description').textContent = item.description;
                article.querySelector('.productCard__timeLeft').textContent = `Time left: ${new Date(item.expires).toLocaleString()}`;
                article.querySelector('.productCard__currentPrice').textContent = `${item.actualPrice} DKK`;
                
                // Assuming 'item.image' contains the base64 image data
                if (item.image) {
                    const img = article.querySelector('.productCard__image');
                    img.src = item.image;
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));

}
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector('.productCard__button');
  button.addEventListener('click', setNewBet);
});
function setNewBet() {
 
  const bidData = {
    itemId: 69,
    value: 2000
  };

  fetch('http://127.0.0.1:3000/bid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bidData),
  
})


.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text(); // Change response.json() to response.text()
})
.then(data => {
  console.log('Response from server:', data); // Log the response
  // Handle success
})
.catch(error => {
  console.error('Error placing bid:', error);
  // Handle error
});

}
