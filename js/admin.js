console.log("🔥 ADMIN.JS DEFINITIVO CARICATO 🔥");

// DARK MODE
import { initDarkMode } from "./darkmode.js";
initDarkMode();

// FIREBASE AUTH
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// DB
import { getPlayers, addMatch } from "./db.js";

/* =====================
   LOGIN
===================== */
const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");

loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (e) {
    alert(e.message);
  }
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, user => {
  loginBox.style.display = user ? "none" : "block";
  adminBox.style.display = user ? "block" : "none";
  if (user) initAdmin();
});

/* =====================
   ADMIN LOGIC
===================== */
let players = [];
let goals = [];

async function initAdmin() {
  players = await getPlayers();
  renderTeams();
  updateGoalSelectors();
}

function renderTeams() {
  teamA.innerHTML = "";
  teamB.innerHTML = "";

  players.forEach(p => {
    teamA.innerHTML += `
      <label>
        <input type="checkbox" value="${p.id}">
        ${p.name}
      </label><br>
    `;
    teamB.innerHTML += `
      <label>
        <input type="checkbox" value="${p.id}">
        ${p.name}
      </label><br>
    `;
  });
}

function updateGoalSelectors() {
  scorer.innerHTML = `<option value="">Marcatore</option>`;
  assist.innerHTML = `<option value="">Assist (opzionale)</option>`;

  players.forEach(p => {
    scorer.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    assist.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

addGoal.onclick = () => {
  const s = scorer.value;
  const a = assist.value || null;

  if (!s) {
    alert("Seleziona un marcatore");
    return;
  }

  const teamAIds = [...document.querySelectorAll("#teamA input:checked")].map(i => i.value);
  const teamBIds = [...document.querySelectorAll("#teamB input:checked")].map(i => i.value);
  const onField = [...teamAIds, ...teamBIds];

  if (!onField.includes(s) || (a && !onField.includes(a))) {
    alert("Gol valido solo per giocatori in campo");
    return;
  }

  goals.push({ scorer: s, assist: a });
  renderGoals();
};

function renderGoals() {
  goalsList.innerHTML = "";
  goals.forEach((g, i) => {
    goalsList.innerHTML += `
      <li>
        ${g.scorer}${g.assist ? " (assist " + g.assist + ")" : ""}
        <button onclick="removeGoal(${i})">❌</button>
      </li>
    `;
  });
}

window.removeGoal = index => {
  goals.splice(index, 1);
  renderGoals();
};

saveMatch.onclick = async () => {
  const teamAIds = [...document.querySelectorAll("#teamA input:checked")].map(i => i.value);
  const teamBIds = [...document.querySelectorAll("#teamB input:checked")].map(i => i.value);

  // ❌ stesso giocatore in entrambe le squadre
  const overlap = teamAIds.filter(id => teamBIds.includes(id));
  if (overlap.length > 0) {
    alert("Un giocatore non può essere in entrambe le squadre");
    return;
  }

  const totalGoals = Number(scoreA.value) + Number(scoreB.value);
  if (goals.length !== totalGoals) {
    alert("Il numero di gol inseriti non corrisponde al risultato");
    return;
  }

  const match = {
    date: date.value,
    time: time.value,
    place: place.value,
    teamA: teamAIds,
    teamB: teamBIds,
    scoreA: Number(scoreA.value),
    scoreB: Number(scoreB.value),
    goals: [...goals]
  };

  await addMatch(match);
  alert("Match salvato correttamente");

  goals = [];
  goalsList.innerHTML = "";
};
