const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// Getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// Storing full name of all months in Hindi
const months = [
  "ᱡᱟᱱᱩᱣᱟᱨᱤ",
  "ᱯᱷᱮᱵᱽᱨᱩᱣᱟᱨᱤ",
  "ᱢᱟᱨᱪ",
  "ᱮᱯᱨᱤᱞ",
  "ᱢᱮ",
  "ᱡᱩᱱ",
  "ᱡᱩᱞᱟᱭ",
  "ᱚᱜᱚᱥᱴ",
  "ᱥᱮᱯᱴᱮᱢᱵᱚᱨ",
  "ᱚᱠᱴᱚᱵᱚᱨ",
  "ᱱᱚᱵᱷᱮᱢᱵᱚᱨ",
  "ᱰᱤᱥᱮᱢᱵᱚᱨ"
];

// Function to convert regular numbers to Hindi numerals
const toHindiNumeral = (num) => {
  const hindiNumbers = ["᱐", "᱑", "᱒", "᱓", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"];
  return num.toString().split("").map(digit => hindiNumbers[parseInt(digit)]).join("");
};

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${toHindiNumeral(lastDateofLastMonth - i + 1)}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${toHindiNumeral(i)}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${toHindiNumeral(i - lastDayofMonth + 1)}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${toHindiNumeral(currYear)}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});
