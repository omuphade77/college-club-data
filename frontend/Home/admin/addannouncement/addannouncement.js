document.getElementById("postAnnouncement").addEventListener("click", async () => {
    const announcementData = {
        announcement_description: document.getElementById("announcementText").value,
        committee_name: document.getElementById("committee").value
    };

    if (!announcementData.announcement_description.trim()) {
        alert("Please enter announcement");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/announcements/addnewannouncement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(announcementData),


        });
        const data = await response.json();
        console.log("Announcement added:", data);
        alert("Announcement added successfully!");

        document.getElementById("announcementText").value = "";
    } catch (error) {
        console.error("Error adding announcement:", error);
        alert("Failed to add announcement");
    }
});

