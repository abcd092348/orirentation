const startButton = document.getElementById("startButton");

if (startButton) {
  startButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (startButton.classList.contains("is-loading")) {
      return;
    }

    startButton.classList.add("is-loading");

    const buttonText = startButton.querySelector("span");

    if (buttonText) {
      buttonText.textContent = "PREPARING EXPERIENCE...";
    }

    window.setTimeout(function () {
      window.location.href = "intro.html";
    }, 450);
  });
}
