   function openCommittee(name) {
    window.location.href = `../Committee/index.html?committeeName=${name}`;
}
//         // Navigation
//         function showSection(sectionId) {
//             // Hide all sections
//             document.querySelectorAll('section').forEach(section => {
//                 section.classList.remove('active');
//             });
            
//             // Remove active class from all nav links
//             document.querySelectorAll('.nav-links a').forEach(link => {
//                 link.classList.remove('active');
//             });
            
//             // Show selected section
//             document.getElementById(sectionId).classList.add('active');
            
//             // Add active class to clicked nav link
//             event.target.classList.add('active');
            
//             // Close mobile menu if open
//             document.getElementById('navLinks').classList.remove('active');
//         }

//         function toggleMenu() {
//             document.getElementById('navLinks').classList.toggle('active');
//         }

//         // Interest Selection
//         let selectedInterests = [];

//         function toggleInterest(element) {
//             element.classList.toggle('selected');
//             const interest = element.textContent.trim();
            
//             if (selectedInterests.includes(interest)) {
//                 selectedInterests = selectedInterests.filter(i => i !== interest);
//             } else {
//                 selectedInterests.push(interest);
//             }
//         }

//         // Match Finding Algorithm
//         function findMatch() {
//             if (selectedInterests.length === 0) {
//                 alert('Please select at least one interest!');
//                 return;
//             }

//             const matches = {
//                 '🎨 Arts & Creativity': { committee: 'Culture Committee', description: 'Perfect for expressing your creative side!' },
//                 '⚽ Sports & Fitness': { committee: 'Sports Committee', description: 'Great choice for staying active and healthy!' },
//                 '📚 Academic Excellence': { committee: 'Academic Committee', description: 'Ideal for those passionate about learning!' },
//                 '💻 Technology': { committee: 'Technical Committee', description: 'Perfect for tech enthusiasts and innovators!' },
//                 '🎉 Event Planning': { committee: 'Events Committee', description: 'Great for organizing amazing experiences!' },
//                 '📱 Social Media': { committee: 'Media Committee', description: 'Perfect for digital storytellers!' },
//                 '🤝 Networking': { committee: 'Social Committee', description: 'Ideal for building connections!' },
//                 '🌍 Environment': { committee: 'Environment Committee', description: 'Perfect for making the world greener!' },
//                 '💰 Finance & Budget': { committee: 'Finance Committee', description: 'Great for financial management skills!' },
//                 '✍️ Writing': { committee: 'Media Committee', description: 'Perfect for content creators!' },
//                 '🎭 Performance': { committee: 'Culture Committee', description: 'Ideal for performers and artists!' },
//                 '📸 Photography': { committee: 'Media Committee', description: 'Perfect for visual storytellers!' }
//             };

//             // Find best match based on first selected interest
//             const firstInterest = selectedInterests[0];
//             const match = matches[firstInterest] || { committee: 'Social Committee', description: 'A great all-around choice!' };

//             // Show result
//             document.getElementById('matchedCommittee').textContent = match.committee;
//             document.getElementById('matchDescription').textContent = match.description;
//             document.getElementById('matchResult').classList.add('show');

//             // Scroll to result
//             document.getElementById('matchResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//         }
    
// function openSidebar() {
//   document.getElementById("sidebar").style.left = "0";
//   document.getElementById("overlay").style.display = "block";
// }

// function closeSidebar() {
//   document.getElementById("sidebar").style.left = "-250px";
//   document.getElementById("overlay").style.display = "none";
// }

// function openIssueForm() {
//   document.getElementById("issueModal").style.display = "flex";
//   closeSidebar();
// }

// function closeIssueForm() {
//   document.getElementById("issueModal").style.display = "none";
// }

// function submitIssue() {
//   let title = document.getElementById("issueTitle").value;
//   let desc = document.getElementById("issueDesc").value;

//   if (title === "" || desc === "") {
//     alert("Please fill all fields!");
//     return;
//   }

//   alert("Issue Submitted!\n\nTitle: " + title + "\nDescription: " + desc);

//   // Reset form
//   document.getElementById("issueTitle").value = "";
//   document.getElementById("issueDesc").value = "";

//   closeIssueForm();
// }
// Toggle hamburger sidebar
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
