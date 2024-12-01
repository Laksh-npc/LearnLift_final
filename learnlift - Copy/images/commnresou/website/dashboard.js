fetch('progress.json')
    .then(response => response.json())
    .then(data => {
        renderProgressBoxes(data.progressBoxes);
        renderChapterComparison(data.standings.chaptersCompleted, 'chapters-completed-graph');
        renderMockTestScores(data.standings.mockTestScores, 'mock-test-scores-graph');
    })
    .catch(error => console.error('Error fetching data:', error));

function renderProgressBoxes(boxes) {
    const progressGrid = document.getElementById('progress-grid');
    progressGrid.innerHTML = ''; 
    boxes.forEach(box => {
        const boxElement = document.createElement('div');
        boxElement.className = 'progress-box';
        boxElement.innerHTML = `<button>${box.title}</button><span>${box.value} ${box.subheading}</span>`;
        progressGrid.appendChild(boxElement);
    });
}

function renderChapterComparison(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    data.forEach(chapter => {
        const chapterGroup = document.createElement('div');
        chapterGroup.className = 'test-group';

     
        const youBar = document.createElement('div');
        youBar.className = 'bar you';
        youBar.style.height = `${chapter.completion.you}px`;
        youBar.setAttribute('data-tooltip', `${chapter.chapter} - Your Completion: ${chapter.completion.you}`);

     
        const othersBar = document.createElement('div');
        othersBar.className = 'bar others';
        othersBar.style.height = `${chapter.completion.others}px`;
        othersBar.setAttribute('data-tooltip', `${chapter.chapter} - Others' Completion: ${chapter.completion.others}`);

        chapterGroup.appendChild(youBar);
        chapterGroup.appendChild(othersBar);
        container.appendChild(chapterGroup);
    });
}

function renderMockTestScores(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    data.forEach(test => {
        const testGroup = document.createElement('div');
        testGroup.className = 'test-group';

      
        const youBar = document.createElement('div');
        youBar.className = 'bar you';
        youBar.style.height = `${test.scores.you}px`;
        youBar.setAttribute('data-tooltip', `Test ${test.test} - Your Score: ${test.scores.you}`);

       
        const othersBar = document.createElement('div');
        othersBar.className = 'bar others';
        othersBar.style.height = `${test.scores.others}px`;
        othersBar.setAttribute('data-tooltip', `Test ${test.test} - Average Score: ${test.scores.others}`);

        testGroup.appendChild(youBar);
        testGroup.appendChild(othersBar);
        container.appendChild(testGroup);
    });
}
