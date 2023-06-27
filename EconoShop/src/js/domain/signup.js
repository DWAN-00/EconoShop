const inputId = document.querySelector(".input-id");
const inputPw = document.querySelector(".input-pw");
const inputPwr = document.querySelector(".input-pwrepeat");
const inputEmail = document.querySelector(".input-email");
const inputSemester = document.querySelector(".input-semester");
const inputForm = document.querySelector(".input-form");

//공백검사
function inputIsEmpty(inputElement, invalideCheckElement) {
  if (inputElement.value == "") {
    event.preventDefault();
    inputElement.classList.add("input-alert");
    invalideCheckElement.classList.add("invalid-visible");
  } else if (inputElement.value !== "") {
    inputElement.classList.remove("input-alert");
    invalideCheckElement.classList.remove("invalid-visible");
  }
}

function inputIdAlert(event) {
  const idInvalidCheck = document.querySelector(".id-invalid-check");
  inputIsEmpty(inputId, idInvalidCheck, () => inputId.value === "");
}

function inputPwAlert(event) {
  const pwInvalidCheck = document.querySelector(".pw-invalid-check");
  inputIsEmpty(inputPw, pwInvalidCheck, () => inputPw.value === "");
}

function inputPwrAlert(event) {
  const pwrInvalidCheck = document.querySelector(".pwr-invalid-check");
  inputIsEmpty(inputPwr, pwrInvalidCheck, () => inputPwr.value === "");
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
  inputIsEmpty(
    inputSemester,
    semesterInvalidCheck,
    () => inputSemester.value === ""
  );
}

inputForm.addEventListener("click", inputIdAlert);
inputForm.addEventListener("click", inputPwAlert);
inputForm.addEventListener("click", inputPwrAlert);
inputForm.addEventListener("click", inputEmailAlert);
inputForm.addEventListener("click", inputSemesterAlert);

document.querySelector(".signupbtn").addEventListener("click", () => {
  const id = document.querySelector(".input-id").value;
  const pw = document.querySelector(".input-pw").value;
  const email = document.querySelector(".input-email").value;
  const semester = document.querySelector(".input-semester").value;

  $.ajax({
    url: "/signup",
    method: "POST",
    data: { id: id, pw: pw, email: email, semester: semester },
  }).done((result) => {
    console.log(result);
    console.log(result.message);
  });
});

function goNewPage(newHref = "") {
  window.location.href = newHref;
}
