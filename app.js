let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let daysErrMsg = document.querySelector(".err-days");
let monthsErrMsg = document.querySelector(".err-months");
let yearsErrMsg = document.querySelector(".err-years");
let btn = document.querySelector(".container .btn");
let yearResult = document.querySelector(".result .years span ");
let monthResult = document.querySelector(".result .months span");
let daysResult = document.querySelector(".result .days span");
let labels = document.querySelectorAll(".label");

let currentDate = new Date();

dayInput.oninput = () => {
  let dayInputvalue = dayInput.value;

  if (dayInputvalue <= 0 || dayInputvalue > 31 || dayInputvalue.length > 2) {
    dayInput.parentNode.classList.add("has-err");
    dayInput.style.borderColor = "hsl(0, 100%, 67%)";
    daysErrMsg.textContent = "Must be a valid day";
    labels[0].style.color = "hsl(0, 100%, 67%)";
  } else {
    dayInput.parentNode.classList.remove("has-err");
    dayInput.style.borderColor = "hsl(0, 0%, 86%)";
    daysErrMsg.textContent = "";
    labels[0].style.color = "hsl(0, 1%, 44%)";
  }
};

monthInput.oninput = () => {
  let val = monthInput.value;
  if (val <= 0 || val > 12 || val.length > 2) {
    monthInput.parentNode.classList.add("has-err");
    monthInput.style.borderColor = "hsl(0, 100%, 67%)";
    monthsErrMsg.textContent = "Must be a valid month";
    labels[1].style.color = "hsl(0, 100%, 67%)";
  } else {
    monthInput.parentNode.classList.remove("has-err");
    monthInput.style.borderColor = "hsl(0, 0%, 86%)";
    monthsErrMsg.textContent = "";
    labels[1].style.color = "hsl(0, 1%, 44%)";
  }
};
yearInput.oninput = () => {
  let val = yearInput.value;
  let regx = /^[1-9]\d{3}$/;

  if (!val.match(regx)) {
    yearInput.parentNode.classList.add("has-err");
    yearInput.style.borderColor = "hsl(0, 100%, 67%)";
    yearsErrMsg.textContent = "Must be a valid year";
    labels[2].style.color = "hsl(0, 100%, 67%)";
  } else if (val > currentDate.getFullYear()) {
    yearInput.parentNode.classList.add("has-err");
    yearInput.style.borderColor = "hsl(0, 100%, 67%)";
    yearsErrMsg.textContent = "Must be in the past";
    labels[2].style.color = "hsl(0, 100%, 67%)";
  } else {
    yearInput.parentNode.classList.remove("has-err");
    yearInput.style.borderColor = "hsl(0, 0%, 86%)";
    yearsErrMsg.textContent = "";
    labels[2].style.color = "hsl(0, 1%, 44%)";
  }
};

btn.addEventListener("click", handleClick);

function handleClick() {
  console.log(isValidDate(dayInput.value, monthInput.value, yearInput.value));

  if (!isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
    dayInput.parentNode.classList.add("has-err");
    dayInput.style.borderColor = "hsl(0, 100%, 67%)";
    daysErrMsg.textContent = "Must be a valid day";
    labels[0].style.color = "hsl(0, 100%, 67%)";
  }

  if (
    !dayInput.parentNode.classList.contains("has-err") &&
    !monthInput.parentNode.classList.contains("has-err") &&
    !yearInput.parentNode.classList.contains("has-err")
  ) {
    if (
      dayInput.value !== "" &&
      monthInput.value !== "" &&
      yearInput.value !== ""
    ) {
      calcAge(dayInput.value, monthInput.value, yearInput.value);
    } else {
      dayInput.style.borderColor = "hsl(0, 100%, 67%)";
      labels[0].style.color = "hsl(0, 100%, 67%)";

      monthInput.style.borderColor = "hsl(0, 100%, 67%)";
      labels[1].style.color = "hsl(0, 100%, 67%)";

      yearInput.style.borderColor = "hsl(0, 100%, 67%)";
      labels[2].style.color = "hsl(0, 100%, 67%)";

      daysErrMsg.textContent = "this field is required";
      monthsErrMsg.textContent = "this field is required";
      yearsErrMsg.textContent = "this field is required";
    }
  }
}

function isValidDate(day, month, year) {
  let date = new Date(year, month - 1, day);
  let result = date.getMonth() + 1 == month;
  return result;
}

function calcAge(dayVal, monthVal, yearVal) {
  let birthday = new Date(`${monthVal} ${dayVal},${yearVal}`).getTime();
  let diffDate = currentDate.getTime() - birthday;
  let year = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (diffDate % (1000 * 60 * 60 * 24 * 365)) / 1000 / 60 / 60 / 24 / 30
  );
  let days = Math.floor(
    (diffDate % (1000 * 60 * 60 * 24 * 365)) / 1000 / 60 / 60 / 24
  );
  yearResult.textContent = year;
  monthResult.textContent = months;
  daysResult.textContent = days;
}
