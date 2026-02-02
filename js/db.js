import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function getMatches() {
  const snap = await getDocs(collection(db,"matches"));
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
}

export async function addMatch(match) {
  await addDoc(collection(db,"matches"), match);
}
