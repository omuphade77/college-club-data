const form = document.getElementById('adminLoginForm');
const passwordInput = document.getElementById('password');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = passwordInput.value;

    try {
        const response = await fetch("http://localhost:3000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        if (response.ok) {
            // Store token and redirect to admin dashboard
            localStorage.setItem("adminToken", data.token);
            alert("Login successful! Redirecting to admin dashboard...");
            //redirect to admin dashboard
            window.location.href = "../Home/admin/admin.html";
        } else {
            alert(data.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
    }
});

