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



// lige  gyldig kode


// button.addEventListener("click", () => {
//   const inputValue = Number(input.value); // Extracting the value from the input field

//   if (inputValue !== "") { // Checking if the value in input field is not empty
//     const x = inputValue % 1000; // Checking if the number is divisible by 1000

//     if (x !== 0) {
//       alert("Du skal byde et tal deleligt med 1000");
//     } else {
//       alert("Bud på " + inputValue + " er modtaget");
//       const itemId = button.closest('.productCard').dataset.itemId; // Getting the itemId
//        // Passing itemId and inputValue to setNewBet function
//     }
//   } else {
//     alert("Skriv et tal inden du klikker på Tryk");
//   }
// });

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
        const productCardsContainer = document.querySelector('.productCards');
        items.forEach((item) => {
            const article = document.createElement('article');
            article.classList.add('productCard');
            article.dataset.itemId = item.itemId;
            const imageSection = document.createElement('section');
            imageSection.classList.add('productCard__section');
            const image = document.createElement('img');
            image.classList.add('productCard__image');
            image.src = item.image || 'images/default_image.png'; 
            image.alt = item.title;
            imageSection.appendChild(image);
            const infoSection = document.createElement('section');
            infoSection.classList.add('productCard__section');
            const brand = document.createElement('h3');
            brand.classList.add('productCard__brand');
            brand.textContent = item.title;
            const description = document.createElement('p');
            description.classList.add('productCard__description');
            description.textContent = item.description;
            const timeLeft = document.createElement('p');
            timeLeft.classList.add('productCard__timeLeft');
            timeLeft.textContent = `Time left: ${new Date(item.expires).toLocaleString()}`;
            const currentPrice = document.createElement('p');
            currentPrice.classList.add('productCard__currentPrice');
            currentPrice.textContent = `${item.actualPrice} DKK`;
            const input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.classList.add('productCard__input');
            const button = document.createElement('button');
            button.classList.add('productCard__button');
            button.textContent = 'Place bid';
            const information = document.createElement('p');
            information.classList.add('productCard__information');
            information.textContent = 'Min. 2000 DKK above the current offer';
            infoSection.appendChild(brand);
            infoSection.appendChild(description);
            infoSection.appendChild(timeLeft);
            infoSection.appendChild(currentPrice);
            infoSection.appendChild(input);
            infoSection.appendChild(button);
            infoSection.appendChild(information);
            article.appendChild(imageSection);
            article.appendChild(infoSection);
            productCardsContainer.appendChild(article);
        });
    })
    .catch(error => console.error('Error:', error));

function getAllItems(){
  fetch('http://127.0.0.1:3000/items/all')
    .then(response => response.json())
    .then((items) => {
        items.forEach((item, index) => {
            const article = document.querySelectorAll('.productCard')[index];

            if (article) {
                article.querySelector('.productCard__brand').textContent = item.title;
                article.querySelector('.productCard__description').textContent = item.description;
                article.querySelector('.productCard__timeLeft').textContent = `Time left: ${new Date(item.expires).toLocaleString()}`;
                article.querySelector('.productCard__currentPrice').textContent = `${item.actualPrice} DKK`;
                article.dataset.itemId = item.itemId;
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
  const productCardsContainer = document.querySelector('.productCards');
  productCardsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('productCard__button')) {
          const productCard = event.target.closest('.productCard');
          if (productCard) {
              const itemId = productCard.dataset.itemId;
              const input = productCard.querySelector('.productCard__input').value;
              console.log(itemId)
              setNewBet(itemId, input);
              
          }
      }
  });
});





function setNewBet(itemId, value) {
  const bidData = {
    "userName": "DARPZ",
    "itemId": Number(itemId),
    "value": value
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
    return response.text(); 
  })
  .then(data => {
    console.log('Response from server:', data); 
    getAllItems()
  })
  .catch(error => {
    console.error('Error placing bid:', error);
  });
}

function createAuction() {
  const title = document.querySelector('.createAuction__data.--brand input').value;
  const description = document.querySelector('.createAuction__data.--model input').value;
  const startPrice = document.querySelector('.createAuction__data.--startingPrice input').value;
  const expiryDate = document.getElementById('start').value;
  const formData = {
    "title": title,
    "description": description,
    "startPrice": startPrice,
    "actualPrice": startPrice,
    "expires": expiryDate,
    "active": true
  };

  fetch('http://127.0.0.1:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Auction created successfully:', data);
    const itemId = data.itemId;
    const imageInput = document.querySelector('.createAuction__imageInput');
    const imageFormData = new FormData();
    imageFormData.append("picture", imageInput.files[0]);
    console.log(itemId)
    fetch(`http://127.0.0.1:3000/upload/${itemId}`, {
      method: 'POST',
      body: imageFormData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Image uploaded successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem uploading the image:', error);
    });
  })
  .catch(error => {
    console.error('There was a problem creating the auction:', error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const createAuctionButton = document.getElementById('create_auction_button');
  createAuctionButton.addEventListener('click', createAuction);
});

