// Function to filter topics based on the search input
function filterTopics() {
    // Get the search query and convert it to lowercase for case-insensitive comparison
    const query = document.getElementById('search-bar').value.toLowerCase();

    // Get all the topic elements
    const topics = document.querySelectorAll('.topic');

    // Loop through each topic and hide/show based on the query match
    topics.forEach(topic => {
        const topicText = topic.textContent.toLowerCase(); // Get text content of each topic
        if (topicText.includes(query)) {
            topic.style.display = 'block'; // Show if query matches
        } else {
            topic.style.display = 'none'; // Hide if query doesn't match
        }
    });
}
