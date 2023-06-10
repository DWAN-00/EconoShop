const inputId = document.querySelector(".input-id");
const inputPw = document.querySelector(".input-pw-login");

function inputIdAlert(event) {
  const idInvalidCheck = document.querySelector(".id-invalid-check");
  if (inputId.value == "") {
    event.preventDefault();
    inputId.classList.add("input-alert");
    idInvalidCheck.classList.add("invalid-visible");
  } else if (inputId.value !== "") {
    inputId.classList.remove("input-alert");
    idInvalidCheck.classList.remove("invalid-visible");
  }
}

function inputPwAlert(event) {
  const pwInvalidCheck = document.querySelector(".pw-invalid-check");
  if (inputPw.value == "") {
    event.preventDefault();
    inputPw.classList.add("input-alert");
    pwInvalidCheck.classList.add("invalid-visible");
  } else if (inputPw.value !== "") {
    inputPw.classList.remove("input-alert");
    pwInvalidCheck.classList.remove("invalid-visible");
  }
}

inputForm.addEventListener("submit", inputIdAlert);
inputForm.addEventListener("submit", inputPwAlert);

function goNewPage(newHref = "") {
  window.location.href = newHref;
}
