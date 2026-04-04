document.getElementById("postEvent").addEventListener("click", async () => {
    const eventData = {
        event_name: document.getElementById("eventName").value,
        event_date: document.getElementById("eventDate").value,
        event_time: document.getElementById("eventTime").value,
        event_location: document.getElementById("eventLocation").value,
        committee_name: document.getElementById("eventCommittee").value,
        event_description: document.getElementById("eventDesc").value,
    };
    if (!eventData.event_name || !eventData.event_date || !eventData.event_time) {
        alert("Please fill required fields");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/events/newevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        });
        const data = await response.json();

        console.log("Event added:", data);
        alert("Event added successfully!");

        //  Show preview
        showPreview(eventData);
    } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add event");
    }
});

function showPreview(event) {
    const preview = document.getElementById("eventPreview");
    preview.innerHTML = `
        <div style="
            background:#111;
            padding:15px;
            margin-top:15px;
            border-radius:10px;
            color:white;
        ">
            <h3>${event.event_name}</h3>
            <p>📅 ${event.event_date} ⏰ ${event.event_time}</p>
            <p>📍 ${event.event_location}</p>
            <p>🏢 ${event.committee_name}</p>
            <p>${event.event_description}</p>
        </div>
    `;
}