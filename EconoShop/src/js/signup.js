const inputId = document.querySelector(".input-id");
const inputPw = document.querySelector(".input-pw");
const inputPwr = document.querySelector(".input-pwrepeat");
const inputEmail = document.querySelector(".input-email");
const inputSemester = document.querySelector(".input-semester");
const inputForm = document.querySelector(".input-form");
//공백검사
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

function inputPwrAlert(event) {
  const pwrInvalidCheck = document.querySelector(".pwr-invalid-check");
  if (inputPwr.value == "") {
    event.preventDefault();
    inputPwr.classList.add("input-alert");
    pwrInvalidCheck.classList.add("invalid-visible");
  } else if (inputPwr.value !== "") {
    inputPwr.classList.remove("input-alert");
    pwrInvalidCheck.classList.remove("invalid-visible");
  }
}

function inputEmailAlert(event) {
  const emailInvalidCheck = document.querySelector(".email-invalid-check");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.value == "") {
    event.preventDefault();
    inputEmail.classList.add("input-alert");
    emailInvalidCheck.classList.add("invalid-visible");
  } else if (!emailRegex.test(inputEmail.value)) {
    event.preventDefault();
    inputEmail.classList.add("input-alert");
    emailInvalidCheck.classList.add("invalid-visible");
    emailInvalidCheck.innerHTML = "PLEASE CHECK YOUR EMAIL";
  } else if (inputEmail.value !== "") {
    inputEmail.classList.remove("input-alert");
    emailInvalidCheck.classList.remove("invalid-visible");
  }
}

function inputSemesterAlert(event) {
  const semesterInvalidCheck = document.querySelector(
    ".semester-invalid-check"
  );
  if (inputSemester.value == "") {
    event.preventDefault();
    inputSemester.classList.add("input-alert");
    semesterInvalidCheck.classList.add("invalid-visible");
  } else if (inputSemester.value !== "") {
    inputSemester.classList.remove("input-alert");
    semesterInvalidCheck.classList.remove("invalid-visible");
  }
}

inputForm.addEventListener("submit", inputIdAlert);
inputForm.addEventListener("submit", inputPwAlert);
inputForm.addEventListener("submit", inputPwrAlert);
inputForm.addEventListener("submit", inputEmailAlert);
inputForm.addEventListener("submit", inputSemesterAlert);

function goNewPage(newHref = "") {
  window.location.href = newHref;
}
