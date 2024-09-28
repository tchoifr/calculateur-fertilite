let selectedDay = null; // Jour sélectionné pour affichage
let cycleLength = 28; // Longueur de cycle par défaut
let currentMonth = new Date().getMonth(); // Mois actuel
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const calendarElement = document.getElementById("calendar");
  calendarElement.innerHTML = ""; // Réinitialiser le calendrier

  // Récupérer le nombre de jours dans le mois sélectionné
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    // Ajouter un événement pour sélectionner un jour
    dayElement.addEventListener("click", () => {
      selectedDay = i;
      updateSelectedDay(); // Met à jour le jour sélectionné
    });

    calendarElement.appendChild(dayElement);
  }
  updateMonthLabel(); // Met à jour le label du mois
}

function updateMonthLabel() {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const monthLabel = document.getElementById("month-label");
  monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

function updateSelectedDay() {
  const dayElements = document.querySelectorAll(".day");
  dayElements.forEach((day) => {
    day.classList.remove("selected"); // Supprimer la sélection
  });

  if (selectedDay) {
    dayElements[selectedDay - 1].classList.add("selected"); // Ajouter la classe sélectionnée
  }
}

function calculateAndDisplayDays() {
  if (!selectedDay) {
    alert("Veuillez sélectionner un jour avant de lancer le calcul.");
    return;
  }

  const calendarElement = document.getElementById("calendar");
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Calculer le jour d'ovulation
  const ovulationDay =
    (selectedDay + cycleLength - 14) % cycleLength || cycleLength; // Jour d'ovulation supposé
  const fertileDaysStart = ovulationDay - 6; // Début de la période fertile
  const fertileDaysEnd = ovulationDay + 1; // Fin de la période fertile

  // Réinitialiser le calendrier pour le calcul
  const dayElements = calendarElement.querySelectorAll(".day");
  dayElements.forEach((day, index) => {
    const dayNumber = index + 1; // Numéro du jour dans le mois

    // Déterminer si le jour est fertile, d'ovulation ou non fertile
    if (dayNumber === ovulationDay) {
      day.classList.add("ovulation"); // Jour d'ovulation
    } else if (dayNumber >= fertileDaysStart && dayNumber <= fertileDaysEnd) {
      day.classList.add("fertile"); // Période fertile
    } else {
      day.classList.add("non-fertile"); // Période non fertile
    }
  });
}

// Gestion des événements pour le carousel de mois
document.getElementById("prev-month").addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  generateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  generateCalendar();
});

// Écouter le changement de cycle
document.getElementById("cycle-length").addEventListener("change", (e) => {
  cycleLength = parseInt(e.target.value);
  generateCalendar(); // Re-générer le calendrier avec le nouveau cycle
});

// Lancer le calcul avec le bouton
document
  .getElementById("calculate-button")
  .addEventListener("click", calculateAndDisplayDays);

// Initialisation du calendrier
generateCalendar();
