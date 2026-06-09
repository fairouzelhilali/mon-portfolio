// --- JEU DE DONNÉES INITIALES (Mock Data) ---
const defaultProjects = [
  {
    id: 1,
    title: "Build a JavaScript Calculator",
    tags: ["HTML5", "CSS3", "JS", "React.js"],
    desc: "Une calculatrice web interactive développée avec React pour freeCodeCamp, qui gère les opérations enchaînées, respecte les priorités mathématiques et empêche les erreurs de saisie.",
    img: "https://imgur.com/omjjCaX.png" 
  },
  {
    id: 2,
    title: "Random Quote Machine",
    tags: ["HTML5", "CSS3", "JS", "React", "Bootstrap", "FontAwesome"],
    desc: "Une application web interactive développée avec React pour freeCodeCamp, qui génère des citations aléatoires à la demande et permet de les partager instantanément sur Twitter (X).",
    img: "https://imgur.com/rdiKjyq.png"
  },
  {
    id: 3,
    title: "Build a Drum Machine",
    tags: ["HTML5", "CSS3", "JS", "React", "Bootstrap", "Babel"],
    desc: "Une boîte à rythmes virtuelle développée avec React pour freeCodeCamp, qui déclenche des sons de percussion au clic ou au clavier et affiche le nom du son joué en temps réel.",
    img: "https://imgur.com/r35DD3Q.png"
  }
];

// Initialisation du LocalStorage
if (!localStorage.getItem('portfolio_projects')) {
  localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
}

// --- DOM ELEMENTS ---
const projectsGrid = document.getElementById('projectsGrid');
const adminProjectList = document.getElementById('adminProjectList');
const adminModal = document.getElementById('adminModal');
const adminBtn = document.getElementById('adminBtn');
const closeModal = document.querySelector('.close-modal');

// --- CHARGEMENT & AFFICHAGE ---
function renderPortfolio() {
  const projects = JSON.parse(localStorage.getItem('portfolio_projects'));
  
  // Si le tableau est vide ou supprimé par mégarde
  if (!projects) return;

  // 1. Affichage Galerie Publique
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
      const tagsHTML = project.tags.map(t => `<span class="tag">${t.trim()}</span>`).join('');
      projectsGrid.innerHTML += `
        <div class="project-card" id="proj-${project.id}">
          <div class="project-img">
            <img src="${project.img || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'}" alt="${project.title}">
          </div>
          <div class="project-info">
            <div class="project-tags">${tagsHTML}</div>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
          </div>
        </div>
      `;
    });
  }

  // 2. Affichage Liste de Suppression dans le Dashboard
  if (adminProjectList) {
    adminProjectList.innerHTML = '';
    projects.forEach(project => {
      adminProjectList.innerHTML += `
        <li class="admin-project-item">
          <span><strong>${project.title}</strong></span>
          <button class="btn-delete" onclick="deleteProject(${project.id})"><i class="fas fa-trash"></i></button>
        </li>
      `;
    });
  }
}

// --- FENÊTRE MODALE CONTROLE ---
if (adminBtn) {
  adminBtn.addEventListener('click', () => {
    // Pré-remplir les inputs du profil avec les valeurs actuelles du DOM
    if (document.getElementById('profileName')) document.getElementById('inputName').value = document.getElementById('profileName').innerText;
    if (document.getElementById('profileTitle')) document.getElementById('inputTitle').value = document.getElementById('profileTitle').innerText;
    if (document.getElementById('profileBio')) document.getElementById('inputBio').value = document.getElementById('profileBio').innerText;
    
    adminModal.classList.add('open');
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => adminModal.classList.remove('open'));
}

window.addEventListener('click', (e) => {
  if (e.target === adminModal) adminModal.classList.remove('open');
});

// Navigation par onglets dans le Dashboard
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  
  // Utilisation sécurisée de l'événement natif de la fonction
  if (window.event) {
    window.event.currentTarget.classList.add('active');
  }
}

// --- ACTIONS DU TABLEAU DE BORD (CRUD LOCALSTORAGE) ---

// 1. Mise à jour du Profil
const editProfileForm = document.getElementById('editProfileForm');
if (editProfileForm) {
  editProfileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('profileName')) document.getElementById('profileName').innerText = document.getElementById('inputName').value;
    if (document.getElementById('profileTitle')) document.getElementById('profileTitle').innerText = document.getElementById('inputTitle').value;
    if (document.getElementById('profileBio')) document.getElementById('profileBio').innerText = document.getElementById('inputBio').value;
    
    adminModal.classList.remove('open');
  });
}

// 2. Ajouter un Projet
const addProjectForm = document.getElementById('addProjectForm');
if (addProjectForm) {
  addProjectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
    
    const newProject = {
      id: Date.now(), // Génère un ID unique basé sur l'horodatage
      title: document.getElementById('projTitle').value,
      tags: document.getElementById('projTech').value.split(','),
      desc: document.getElementById('projDesc').value,
      img: document.getElementById('projImg').value
    };

    projects.push(newProject);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    
    renderPortfolio();
    this.reset();
    alert('Projet ajouté avec succès au catalogue virtuel !');
  });
}

// 3. Supprimer un Projet
function deleteProject(id) {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    let projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderPortfolio();
  }
}

// --- ANIMATION INTERACTIVE DES SKILL CARDS ---
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  // Ajout d'une transition CSS fluide directement via JS
  card.style.transition = 'transform 0.3s ease';

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.08)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

// Lancement au chargement complet du DOM
document.addEventListener('DOMContentLoaded', renderPortfolio);
