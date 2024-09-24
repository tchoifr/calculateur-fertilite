let selectedDay = 1; // Par défaut, le premier jour est sélectionné

function generateCalendar(cycleLength = 28) {
  const calendarElement = document.getElementById("calendar");
  calendarElement.innerHTML = ""; // Réinitialiser le calendrier

  for (let i = 1; i <= cycleLength; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    if (i === selectedDay) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => {
      selectedDay = i;
      updateSelectedDay(); // Met à jour le jour sélectionné
    });

    calendarElement.appendChild(dayElement);
  }
}

function updateSelectedDay() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.classList.remove("selected");
  });

  const selectedDayElement = days[selectedDay - 1];
  selectedDayElement.classList.add("selected");
}

function calculateFertileDays(cycleLength) {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.classList.remove("fertile", "ovulation", "non-fertile");
    day.querySelector(".logo")?.remove(); // Retirer les logos des jours avant de recalculer
  });

  const ovulationDay =
    (selectedDay + cycleLength - 14) % cycleLength || cycleLength; // Jour d'ovulation supposé
  const fertileDaysStart = ovulationDay - 6; // Début de la période fertile
  const fertileDaysEnd = ovulationDay + 1; // Fin de la période fertile

  days.forEach((day, index) => {
    const dayNumber = index + 1;
    if (dayNumber === ovulationDay) {
      day.classList.add("ovulation");
    } else if (dayNumber >= fertileDaysStart && dayNumber <= fertileDaysEnd) {
      day.classList.add("fertile");
    } else {
      day.classList.add("non-fertile");
    }

    // Ajouter les logos sur les jours spécifiés après le calcul
    const logoElement = document.createElement("img");
    logoElement.src = "logo.png"; // Remplacez par le chemin de votre logo
    logoElement.classList.add("logo");

    if (dayNumber === selectedDay) {
      day.appendChild(logoElement);
    }
  });
}

document.getElementById("calculate-btn").addEventListener("click", () => {
  const cycleLength = parseInt(
    document.getElementById("cycle-length").value,
    10
  );
  calculateFertileDays(cycleLength);
});

// Initialisation du calendrier avec la longueur de cycle par défaut
generateCalendar();
