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

fetchCommitteeData();