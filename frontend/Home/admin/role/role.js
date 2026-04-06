window.onload = loadRequests; // ✅ auto load on page open

async function loadRequests() {
    try {
        const response = await fetch("http://localhost:3000/api/roles/pending");
        const result = await response.json();
displayRequests(result.data);
    } catch (err) {
        console.error("Error fetching requests:", err);
    }
}

function displayRequests(data) {
    const container = document.getElementById("requests");
    container.innerHTML = "";

    // ✅ handle empty case
    if (data.length === 0) {
        container.innerHTML = "<p>No pending requests</p>";
        return;
    }

    data.forEach(req => {
        container.innerHTML += `
            <div class="request-card">
                <h3>${req.name}</h3>
                
                <p><strong>Mobile:</strong> ${req.mobile}</p>
                <p><strong>Email:</strong> ${req.email}</p>
                <p><strong>Branch:</strong> ${req.branch}</p>
                <p><strong>Role:</strong> ${req.role}</p>
                <p><strong>Committee:</strong> ${req.committee_name}</p>
                <p><strong>Year:</strong> ${req.year}</p>

                <div class="actions">
                    <button onclick="approve(${req.id})">✅ Approve</button>
                    <button onclick="reject(${req.id})">❌ Reject</button>
                </div>
            </div>
        `;
    });
}

async function approve(id) {
    if (!confirm("Approve this request?")) return; // ✅ confirmation

    try {
        await fetch(`http://localhost:3000/api/roles/approve/${id}`, {
            method: "POST"
        });

        alert("Approved successfully");
        loadRequests(); // refresh

    } catch (err) {
        console.error("Approve error:", err);
    }
}

async function reject(id) {
    if (!confirm("Reject this request?")) return; // ✅ confirmation

    try {
        await fetch(`http://localhost:3000/api/roles/reject/${id}`, {
            method: "POST"
        });

        alert("Rejected");
        loadRequests();

    } catch (err) {
        console.error("Reject error:", err);
    }
}