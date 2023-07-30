const inputName = document.querySelector(".input-name");
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

function inputNameAlert(event) {
  const nameInvalidCheck = document.querySelector(".name-invalid-check");
  inputIsEmpty(inputName, nameInvalidCheck, () => inputName.value === "");
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
inputForm.addEventListener("submit", inputNameAlert);
inputForm.addEventListener("submit", inputIdAlert);
inputForm.addEventListener("submit", inputPwAlert);
inputForm.addEventListener("submit", inputPwrAlert);
inputForm.addEventListener("submit", inputEmailAlert);
inputForm.addEventListener("submit", inputSemesterAlert);
//비동기 통신 : 나중에 추가
inputForm.addEventListener("submit", () => {
  const id = document.querySelector(".input-id").value;
  const pw = document.querySelector(".input-pw").value;
  const email = document.querySelector(".input-email").value;
  const semester = document.querySelector(".input-semester").value;

  $.ajax({
    url: "/signup",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      id: id,
      pw: pw,
      pwr: pwr,
      email: email,
      semester: semester,
    }),
  }).done((result) => {
    if (result.code == 1) {
      alert(id + " 님 환영합니다!");
      location.href = "/login";
    } else {
      alert("이미 가입된 아이디입니다.");
    }
  });
});
