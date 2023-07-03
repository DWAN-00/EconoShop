const id = document.querySelector(".input-id");
const pw = document.querySelector(".input-pw-login");

function idAlert(event) {
  const idInvalidCheck = document.querySelector(".id-invalid-check");
  if (id.value == "") {
    event.preventDefault();
    id.classList.add("input-alert");
    idInvalidCheck.classList.add("invalid-visible");
  } else if (id.value !== "") {
    id.classList.remove("input-alert");
    idInvalidCheck.classList.remove("invalid-visible");
  }
}

function pwAlert(event) {
  const pwInvalidCheck = document.querySelector(".pw-invalid-check");
  if (pw.value == "") {
    event.preventDefault();
    pw.classList.add("input-alert");
    pwInvalidCheck.classList.add("invalid-visible");
  } else if (pw.value !== "") {
    pw.classList.remove("input-alert");
    pwInvalidCheck.classList.remove("invalid-visible");
  }
}

inputForm.addEventListener("submit", idAlert);
inputForm.addEventListener("submit", pwAlert);

function goNewPage(newHref = "") {
  window.location.href = newHref;
}

document.querySelector(".signupbtn").addEventListener("submit", () => {
  const id = document.querySelector(".input-id").value;
  const pw = document.querySelector(".input-pw").value;

  $.ajax({
    url: "/login",
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: JSON.stringify({
      id: id,
      pw: pw,
    }),
  }).done((result) => {
    if (result.code == 1) {
      alert(id + " 님 로그인성공!");
      location.href = "/mypage";
    } else {
      alert("아이디, 비밀번호 확인하셈");
      location.href = "/login";
    }
  });
});
