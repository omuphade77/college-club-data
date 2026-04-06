const params = new URLSearchParams(window.location.search);
const committeeName = params.get('committeeName'); // must match URL
const img = new Image();

if (!committeeName) {
    alert("No committee selected");
    throw new Error("Missing committee name");
}

async function fetchCommitteeData() {
    try {
        const response = await fetch(
            `http://localhost:3000/api/committees/${committeeName}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // ✅ MATCH WITH YOUR TABLE
        img.src = data.committee_logo_url;
        document.getElementById("name").innerText = data.committee_name;
        document.getElementById("description").innerText = data.committee_description;
        document.getElementById("logo").src = img.src;

    } catch (error) {
        console.error('Error fetching committee data:', error);
    }
}

async function fetchMembers() {
    try {
        const res = await fetch("http://localhost:3000/api/roles/members");
        const result = await res.json();

        displayMembers(result.data);
    } catch (err) {
        console.error("Error fetching members:", err);
    }
}

function displayMembers(members) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    // ✅ filter by current committee
    const filtered = members.filter(
        m => m.committee_name === committeeName
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No members yet</p>";
        return;
    }

    // ✅ group by year
    const grouped = {};

    filtered.forEach(m => {
        if (!grouped[m.year]) grouped[m.year] = [];
        grouped[m.year].push(m);
    });

    // ✅ render
    Object.keys(grouped).forEach(year => {
        const yearBlock = document.createElement("div");

        yearBlock.innerHTML = `
            <h3 style="margin-top:20px;">${year} Year</h3>
            <div class="member-grid">
                ${grouped[year].map(m => `
                    <div class="member-card">
                        <h4>${m.name}</h4>
                        <p>${m.role}</p>
                        <p>${m.branch}</p>
                    </div>
                `).join("")}
            </div>
        `;

        container.appendChild(yearBlock);
    });
}

fetchCommitteeData();
fetchMembers();