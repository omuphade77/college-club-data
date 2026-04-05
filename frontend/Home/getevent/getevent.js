async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:3000/api/events/getevents');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayEvents(data);
    } catch (error) {
        console.error('Error fetching events:', error);

    }

}

function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    events.forEach(event => {
        // 📅 Format date
        const dateObj = new Date(event.event_date);
        const day = dateObj.toLocaleString("en-US", { month: "short" }) + " " + dateObj.getDate();
        const year = dateObj.getFullYear();

        const div = document.createElement('div');
        div.classList.add("event-card");
        div.innerHTML = `
        <div class="event-header">
                <div class="event-date">${day}</div>
                <div>${year}</div>
            </div>
            <div class="event-body">
                <div class="event-title">${event.event_name}</div>
                <div class="event-details">📍 ${event.event_location}</div>
                <div class="event-details">🕐 ${event.event_time}</div>
                <div class="event-details">${event.event_description}</div>
                <span class="event-committee">${event.committee_name}</span>
            </div>
        `;
        eventsContainer.appendChild(div);
    });
}

fetchEvents();
