function openPage(page) {
    switch (page) {
        case 'resources':
            window.location.href = './images/commnresou/website/resources.html';
            break;
        case 'mock-tests':
            window.location.href = './images/mock/LEARNLIFT/mock.html';
            break;
        case 'dashboard':
            window.location.href = './dashboard.html';
            break;
        case 'community':
            window.location.href = './images/commnresou/website/community.html';
            break;
        default:
            console.error("Invalid page.");
    }
}