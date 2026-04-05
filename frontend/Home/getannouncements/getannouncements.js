async function fetchAnnouncements() {
    try {
        const response = await fetch('http://localhost:3000/api/announcements/getannouncements');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        displayAnnouncements(data);
    } catch (error) {
        console.error('Error fetching announcements:', error);
    }
}

function displayAnnouncements(announcements) {
    const announcementsContainer = document.getElementById('announcements-container');
    announcementsContainer.innerHTML = '';
    // Clear old static content
    announcementsContainer.innerHTML = "<h1>Announcements</h1>";

    announcements.forEach(announcement => {
        const div = document.createElement('div');

        div.innerHTML = `
        <h3>${announcement.committee_name}</h3>
            <p>${announcement.announcement_description}</p>
            <hr>
        `;
        announcementsContainer.appendChild(div);
    }

    );
}

fetchAnnouncements();
