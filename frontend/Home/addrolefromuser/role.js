const form = document.getElementById("roleForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚨 prevents page refresh

    const data = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        branch: document.getElementById("branch").value,
        role: document.getElementById("role").value,
        committee_name: document.getElementById("committee_name").value,
        year: document.getElementById("year").value
    };

    try {
        const res = await fetch("http://localhost:3000/api/roles/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Request submitted successfully!");
            form.reset();
        } else {
            alert("Failed to submit request");
        }

    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});