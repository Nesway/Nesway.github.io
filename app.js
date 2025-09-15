// Assure-toi d’avoir inclus le SDK Firestore (ou Realtime)
// Si tu utilises Firestore :

const tachesRef = db.collection('taches');
const objectifRef = db.collection('parametres').doc('objectifHebdo');

let objectif = 0;

async function chargerObjectif() {
  const doc = await objectifRef.get();
  if (doc.exists) {
    objectif = doc.data().nombre || 0;
    document.getElementById('objectif-affiche').innerText = `Objectif : ${objectif} tâches`;
  }
}

async function sauvegarderObjectif(n) {
  await objectifRef.set({ nombre: n });
  objectif = n;
  document.getElementById('objectif-affiche').innerText = `Objectif : ${objectif} tâches`;
  miseAJourStats();
}

function ajouterTacheDansUI(id, texte, done) {
  const ul = document.getElementById('liste-taches');
  const li = document.createElement('li');
  li.id = id;
  li.innerText = texte;
  if (done) li.classList.add('completed');

  const btnToggle = document.createElement('button');
  btnToggle.innerText = done ? 'Annuler' : 'Terminer';
  btnToggle.onclick = () => toggleTache(id, !done);

  const btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Supprimer';
  btnSuppr.onclick = () => supprimerTache(id);

  li.appendChild(btnToggle);
  li.appendChild(btnSuppr);
  ul.appendChild(li);
}

async function chargerTaches() {
  document.getElementById('liste-taches').innerHTML = '';
  const snapshot = await tachesRef.get();
  snapshot.forEach(doc => {
    const data = doc.data();
    ajouterTacheDansUI(doc.id, data.texte, data.done);
  });
  miseAJourStats();
}

async function ajouterTache(texte) {
  if (!texte) return;
  await tachesRef.add({ texte: texte, done: false });
  chargerTaches();
}

async function toggleTache(id, done) {
  await tachesRef.doc(id).update({ done });
  chargerTaches();
}

async function supprimerTache(id) {
  await tachesRef.doc(id).delete();
  chargerTaches();
}

async function miseAJourStats() {
  const snapshot = await tachesRef.get();
  let total = 0, faites = 0;
  snapshot.forEach(doc => {
    total++;
    if (doc.data().done) faites++;
  });
  document.getElementById('stats‑texte').innerText = `${faites} / ${objectif} tâches faite(s)`;
  const taux = objectif > 0 ? Math.round((faites / objectif) * 100) : 0;
  document.getElementById('taux').innerText = `Taux : ${taux}%`;
}

// Événements UI

document.getElementById('objectif-save').addEventListener('click', () => {
  const n = parseInt(document.getElementById('objectif-input').value, 10);
  if (!isNaN(n) && n >= 0) {
    sauvegarderObjectif(n);
  }
});

document.getElementById('ajouter-tache').addEventListener('click', () => {
  const texte = document.getElementById('nouvelle-tache-input').value.trim();
  if (texte) {
    ajouterTache(texte);
    document.getElementById('nouvelle-tache-input').value = '';
  }
});

// Initialisation

window.onload = () => {
  chargerObjectif();
  chargerTaches();
};

