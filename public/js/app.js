/** @format */

console.log("JS is running on client side");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("http://localhost:5000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.errMsg) {
          return (messageOne.textContent = data.errMsg);
        }
        messageOne.textContent = data.location;
        messageTwo.textContent =
          "It's " + data.forecast.temperature + " degree out and " + data.forecast.precip + "% chances of rain";
      });
    }
  );
});
