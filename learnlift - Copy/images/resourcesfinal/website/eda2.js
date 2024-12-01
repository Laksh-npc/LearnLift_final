document.addEventListener("DOMContentLoaded", function () {
    const edaContainer = document.getElementById('edaContainer');
    fetch('edaData.json')
        .then(response => response.json())
        .then(edaData => {
            edaContainer.innerHTML = `
                <header>
                    <h1>${edaData.title}</h1>
                    <p>${edaData.headerText}</p>
                </header>
                
                ${edaData.sections.map(section => `
                    <section class="${section.heading.toLowerCase().replace(/\s/g, '-')}">
                        <h2>${section.heading}</h2>
                        ${section.content ? `<p>${section.content}</p>` : ''}
                        ${section.techniques ? section.techniques.map(technique => `
                            <article class="technique">
                                <h3>${technique.title}</h3>
                                <p>${technique.content}</p>
                            </article>
                        `).join('') : ''}
                        ${section.image ? `<img src="${section.image}" alt="${section.heading}">` : ''}
                    </section>
                `).join('')}

                <section class="python-code-snippets">
                    <h2>Python Code Snippets for EDA</h2>
                    ${edaData.pythonSnippets.map(snippet => `
                        <pre><code>${snippet}</code></pre>
                    `).join('')}
                </section>
            `;
        })
        .catch(error => console.error("Error loading EDA data:", error));
});
