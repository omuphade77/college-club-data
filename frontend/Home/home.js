   function openCommittee(name) {
    window.location.href = `../Committee/index.html?committeeName=${name}`;
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

// Show sections (Home, Events, Match)
function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  // Update active nav link
  document.querySelectorAll(".nav-links li a").forEach(a => a.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-links li a[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add("active");

  closeSidebar();
}

// Issue modal
function openIssueForm() {
  const modal = document.getElementById("issueModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  closeSidebar();
}

function closeIssueForm() {
  const modal = document.getElementById("issueModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("issueTitle").value = "";
  document.getElementById("issueDesc").value = "";
  document.getElementById("issueCategory").value = "general";
}

function submitIssue() {
  const title = document.getElementById("issueTitle").value.trim();
  const desc = document.getElementById("issueDesc").value.trim();
  const category = document.getElementById("issueCategory").value;

  if (!title || !desc) {
    // Show inline error instead of alert
    const err = document.getElementById("issueError");
    err.style.display = "block";
    setTimeout(() => err.style.display = "none", 3000);
    return;
  }

  // Show success state
  document.getElementById("issueFormBody").style.display = "none";
  document.getElementById("issueSuccess").style.display = "flex";

  setTimeout(() => {
    closeIssueForm();
    document.getElementById("issueFormBody").style.display = "block";
    document.getElementById("issueSuccess").style.display = "none";
  }, 2500);
}

// Close modal on backdrop click
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("issueModal").addEventListener("click", function(e) {
    if (e.target === this) closeIssueForm();
  });
});

// Interest selection toggle
function toggleInterest(element) {
  element.classList.toggle("selected");
}

// Match logic
function findMatch() {
  const selected = document.querySelectorAll(".interest-tag.selected");

  if (selected.length === 0) {
    alert("Please select at least one interest!");
    return;
  }

  let interests = Array.from(selected).map(el => el.innerText.trim());

  let match = "";
  let description = "";

  if (interests.some(i => i.includes("Technology"))) {
    match = "Technovanza / Community of Coders";
    description = "Perfect for tech enthusiasts who love innovation and building things!";
  } else if (interests.some(i => i.includes("Academic Excellence"))) {
    match = "Community of Coders";
    description = "Perfect for tech enthusiasts who love coding and academic growth!";
  } else if (interests.some(i => i.includes("Sports"))) {
    match = "Enthusia";
    description = "Great for sports lovers and fitness enthusiasts!";
  } else if (interests.some(i => i.includes("Arts") || i.includes("Performance"))) {
    match = "Rangwardhan / Pratibimb";
    description = "Ideal for creative minds passionate about arts and culture!";
  } else if (interests.some(i => i.includes("Environment"))) {
    match = "Swacch VJTI";
    description = "Best for those who care about sustainability and the environment!";
  } else if (interests.some(i => i.includes("Finance"))) {
    match = "Ecell VJTI";
    description = "Great for managing budgets and entrepreneurship!";
  } else if (interests.some(i => i.includes("Writing"))) {
    match = "Digital Literary Activities";
    description = "Perfect for writers and literature enthusiasts!";
  } else {
    match = "Digital VJTI";
    description = "Perfect for networking, entrepreneurship and outreach!";
  }

  document.getElementById("matchedCommittee").innerText = match;
  document.getElementById("matchDescription").innerText = description;
  document.getElementById("matchResult").style.display = "block";
  document.getElementById("matchResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function openAdminPanel() {
  window.location.href = "../Login/admin.html";
}

function openRoleForm() {
  window.location.href = "addrolefromuser/role.html";
}
