const committeeName = "TT"; // temporary hardcoded value, replace with dynamic value as needed
async function fetchCommitteeData() {
    try {
        const response = await fetch(`http://localhost:3000/api/committee/${committeeName}`);
    
        const data = await response.json();

        // Update UI
        document.getElementById("name").innerText = data.committee_name;
        document.getElementById("description").innerText = data.committee_description;
        document.getElementById("logo").src = data.committee_logo;

    } catch (error) {
        console.error('Error fetching committee data:', error);
    }
}

fetchCommitteeData();

