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

  // Mapping of interest → committee
  const mapping = {
    "Technology": {
      committee: "Technovanza / Community of Coders",
      desc: "Innovation, coding and tech building "
    },
    "Academic Excellence": {
      committee: "Community of Coders",
      desc: "Coding + academics "
    },
    "Sports": {
      committee: "Enthusia",
      desc: "Sports & fitness "
    },
    "Arts": {
      committee: "Rangwardhan / Pratibimb",
      desc: "Creative arts "
    },
    "Performance": {
      committee: "Rangwardhan / Pratibimb",
      desc: "Stage & performance "
    },
    "Environment": {
      committee: "Swacch VJTI",
      desc: "Sustainability "
    },
    "Finance": {
      committee: "Ecell VJTI",
      desc: "Finance & entrepreneurship "
    },
    "Writing": {
      committee: "Digital Literary Activities",
      desc: "Writing & content "
    },
    "Social Media": {
      committee: "Digital VJTI",
      desc: "Social media & outreach "
    },
    "Event Planning": {
      committee: "Technovanza / Enthusia",
      desc: "Event management "
    },
    "Photography": {
      committee: "Digital VJTI",
      desc: "Photography "
    }
  };

  let resultsHTML = "";

  interests.forEach(interest => {
    for (let key in mapping) {
      if (interest.includes(key)) {
        const data = mapping[key];

        resultsHTML += `
          <div class="match-card">
            <h4> ${interest}</h4>
            <p><strong>Committee:</strong> ${data.committee}</p>
            <p>${data.desc}</p>
          </div>
        `;
      }
    }
  });

  document.getElementById("matchedCommittee").innerHTML = resultsHTML;
  document.getElementById("matchDescription").innerText = "Based on your selected interests:";
  document.getElementById("matchResult").style.display = "block";

  document.getElementById("matchResult").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}
function openAdminPanel() {
  window.location.href = "../Login/admin.html";
}

function openRoleForm() {
  window.location.href = "addrolefromuser/role.html";
}
