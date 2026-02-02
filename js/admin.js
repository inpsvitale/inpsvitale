import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
  if (!scorer.value) return;
  goals.push({
    scorer: scorer.value,
    assist: assist.value || null
  });
  renderGoals();
};

function renderGoals() {
  goalsList.innerHTML = "";
  goals.forEach(g => {
    goalsList.innerHTML += `
      <li>
        ${g.scorer}${g.assist ? " (assist " + g.assist + ")" : ""}
      </li>
    `;
  });
}

saveMatch.onclick = async () => {
  const teamAIds = [...document.querySelectorAll("#teamA input:checked")].map(i => i.value);
  const teamBIds = [...document.querySelectorAll("#teamB input:checked")].map(i => i.value);

  if (teamAIds.length === 0 || teamBIds.length === 0) {
    alert("Seleziona i giocatori per entrambe le squadre");
    return;
  }

  await addMatch({
    date: date.value,
    time: time.value,
    place: place.value,
    teamA: teamAIds,
    teamB: teamBIds,
    scoreA: +scoreA.value,
    scoreB: +scoreB.value,
    goals
  });

  alert("Match salvato correttamente");
  goals = [];
};
