// write your code here
function fetchData() {
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((characters) => characters.forEach((food) => showList(food)));
}

function showList(food) {
  let span = document.createElement("span");
  span.id = food.id;
  let div = document.getElementById("ramen-menu");
  span.innerHTML = `<img src="${food.image}">`;
  div.appendChild(span);

  span.addEventListener("click", (e) => {
    document.getElementById("ramen-detail").innerHTML = `
<img class="detail-image" src="${food.image}" alt="${food.name}" />
<h2 class="name">${food.name}</h2>
<h3 class="restaurant">${food.restaurant}</h3>
`;
    document.getElementById("rating-display").textContent = food.rating;
    document.getElementById("comment-display").textContent = food.comment;
  });
}

document.getElementById("new-ramen").addEventListener("submit", (e) => {
  event.preventDefault();
  let name = event.target.name.value;
  let restaurant = event.target.restaurant.value;
  let image = event.target.image.value;
  let rating = event.target.rating.value;
  let comment = event.target.comment.value;

  fetch(`http://localhost:3000/ramens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`success`);
      } else {
        console.error(`Failed`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
