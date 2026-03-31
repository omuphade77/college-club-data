async function fetchIssues() {
    try {
        const response = await fetch("http://localhost:3000/api/issues/all");
        const data = await response.json();

        displayIssues(data);
    } catch (error) {
        console.error("Error fetching issues:", error);
    }

}

function displayIssues(issues) {
    const container = document.getElementById("issues");

    container.innerHTML = ""; // Clear existing content

    issues.forEach((issue) => {
        const div = document.createElement("div");
        div.classList.add("issue-card");

        div.innerHTML = `
            <h3>${issue.issue_title}</h3>
            <p>${issue.issue_text}</p>
            `;
        container.appendChild(div);
    });
}

fetchIssues();