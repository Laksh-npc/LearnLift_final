document.getElementById("searchBar").addEventListener("keyup", function() {
    const searchTerm = this.value.toLowerCase();
    const topics = document.querySelectorAll(".topic");

    topics.forEach(topic => {
        const topicText = topic.textContent.toLowerCase();
        if (topicText.includes(searchTerm)) {
            topic.style.display = "block";
        } else {
            topic.style.display = "none";
        }
    });
});
