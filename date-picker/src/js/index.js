class DatePicker {
  #monthData = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber",
  ];

  #calendarDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  #selectedDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  #today = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  dateInputEl;
  calendarEl;
  monthEl;
  dateEl;

  constructor() {
    this.getDomElements();
    this.addEvent();
    this.initCalendarDate();
    this.markToday();
  }

  initCalendarDate() {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    const date = data.getDate();
    this.#calendarDate = { data, date, month, year };
    this.#today = { data, date, month, year };

    this.updateView();
    this.showDateInput(this.#today);
  }

  updateView() {
    this.monthEl.innerText = `${this.#monthData[
      this.#calendarDate.month
    ].toUpperCase()} ${this.#calendarDate.year}`;
    this.updateDates();
    this.markToday();
    this.markSelected();
  }

  markToday() {
    if (
      this.#today.year === this.#calendarDate.year &&
      this.#today.month === this.#calendarDate.month
    ) {
      this.dateEl
        .querySelector(`[data-date='${this.#today.date}']`)
        .classList.add("today");
    }
  }

  getDomElements() {
    this.dateInputEl = document.querySelector(".date-input");
    this.calendarEl = document.querySelector(".calendar");
    this.monthEl = this.calendarEl.querySelector(".mth");
    this.nextBtn = this.calendarEl.querySelector("#next");
    this.prevBtn = this.calendarEl.querySelector("#prev");
    this.dateEl = this.calendarEl.querySelector(".dates");
  }

  addEvent() {
    this.dateInputEl.addEventListener("click", this.toggleCalendar);
    this.nextBtn.addEventListener("click", this.showNextMonth);
    this.prevBtn.addEventListener("click", this.showPrevMonth);
    this.dateEl.addEventListener("click", this.handleDateClick);
  }

  handleDateClick = (e) => {
    if (e.target.classList.contains("date")) {
      this.#selectedDate = {
        ...this.#calendarDate,
        date: +e.target.dataset.date,
      };
    }
    console.log(this.#selectedDate);
    this.markSelected();
  };

  markSelected = () => {
    const { date, month, year } = this.#selectedDate;
    if (
      month === this.#calendarDate.month &&
      year === this.#calendarDate.year
    ) {
      this.dateEl.querySelector(".selected")?.classList.remove("selected");
      this.dateEl
        .querySelector(`[data-date='${date}']`)
        .classList.add("selected");
    }
    if (year !== 0) {
      this.showDateInput(this.#selectedDate);
    }
  };

  toggleCalendar = () => {
    if (this.calendarEl.classList.contains("active")) {
      this.#calendarDate = { ...this.#selectedDate };
    }
    this.calendarEl.classList.toggle("active");
    this.updateView();
  };

  updateDates() {
    this.dateEl.innerHTML = "";
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate();

    const startDayOfMonth = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month,
      1
    ).getDay();

    console.log(startDayOfMonth);
    for (let i = 1; i <= numberOfDates; i++) {
      this.dateEl.innerHTML += `<div class='date' data-date='${i}'>${i}</div>`;
    }
    this.dateEl.firstChild.style.gridColumnStart = startDayOfMonth + 1;
    this.colorSaturdays();
    this.colorSundays();
  }

  colorSaturdays() {
    const saturdayEls = this.calendarEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`
    );
    saturdayEls.forEach((sat) => (sat.style.color = "blue"));
  }

  colorSundays() {
    const sundayEls = this.calendarEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month,
            1
          ).getDay()) %
        7
      })`
    );
    sundayEls.forEach((sun) => (sun.style.color = "red"));
  }

  showNextMonth = () => {
    this.#calendarDate.month++;
    if (this.#calendarDate.month === 12) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year++;
    }
    console.log(this.#calendarDate);
    this.updateView();
  };

  showPrevMonth = () => {
    this.#calendarDate.month--;
    if (this.#calendarDate.month === -1) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year--;
    }

    this.updateView();
  };

  showDateInput = (data) => {
    const { date, month, year } = data;
    this.dateInputEl.innerText = `${year}/${
      month < 9 ? "0" + (month + 1) : month + 1
    }/${date < 10 ? "0" + date : date}`;
  };
}

new DatePicker();
