import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
  } catch (e) {
    console.error(e);
    alert(e.message);
    //alert("Login fallito");
  }
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.style.display = "none";
    adminBox.style.display = "block";
  } else {
    loginBox.style.display = "block";
    adminBox.style.display = "none";
  }
});


import { getPlayers, addMatch } from "./db.js";

let players = [];
let goals = [];

async function initAdmin() {
  players = await getPlayers();

  const teamA = document.getElementById("teamA");
  const teamB = document.getElementById("teamB");

  players.forEach(p => {
    teamA.innerHTML += `<label><input type="checkbox" value="${p.id}"> ${p.name}</label><br>`;
    teamB.innerHTML += `<label><input type="checkbox" value="${p.id}"> ${p.name}</label><br>`;
  });

  updateGoalSelectors();
}

function updateGoalSelectors() {
  const scorer = document.getElementById("scorer");
  const assist = document.getElementById("assist");

  scorer.innerHTML = `<option value="">Marcatore</option>`;
  assist.innerHTML = `<option value="">Assist</option>`;

  players.forEach(p => {
    scorer.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    assist.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

document.getElementById("addGoal").onclick = () => {
  const scorer = document.getElementById("scorer").value;
  const assist = document.getElementById("assist").value || null;
  if (!scorer) return;

  goals.push({ scorer, assist });
  renderGoals();
};

function renderGoals() {
  const list = document.getElementById("goalsList");
  list.innerHTML = "";
  goals.forEach(g => {
    list.innerHTML += `<li>${g.scorer}${g.assist ? " (assist "+g.assist+")" : ""}</li>`;
  });
}

document.getElementById("saveMatch").onclick = async () => {
  const teamA = [...document.querySelectorAll("#teamA input:checked")].map(i=>i.value);
  const teamB = [...document.querySelectorAll("#teamB input:checked")].map(i=>i.value);

  await addMatch({
    date: date.value,
    time: time.value,
    place: place.value,
    teamA,
    teamB,
    scoreA: +scoreA.value,
    scoreB: +scoreB.value,
    goals
  });

  alert("Match salvato");
  goals = [];
};

initAdmin();
