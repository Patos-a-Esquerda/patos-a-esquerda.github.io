`
    dependencies:
        * authorsMetadata.js
        * categoriesMetadata.js
        * pagesMetadata.js
`

function _buildArticleHeaderUlSection(page) {
    const lead = document.querySelector('article header p');
    const ul = document.createElement('ul');
    ul.classList.add('article-classification')
    page.categories.forEach(category => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${window.location.origin}/search.html?cat=${category.id}`;
        li.classList.add('category');
        a.innerText = category.alias;
        li.appendChild(a);
        ul.appendChild(li);
    });
    page.authors.forEach(author => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${window.location.origin}/search.html?author=${author.id}`;
        li.classList.add('author');
        a.innerText = author.alias;
        li.appendChild(a);
        ul.appendChild(li);
    });
    const li = document.createElement('li');
    li.classList.add('timestamp');
    const timestamp = new Date(page.timestamp).toLocaleDateString('pt-BR');
    li.innerText = timestamp;
    ul.appendChild(li);
    lead.insertAdjacentElement('afterend', ul);
}

function _init() {
    const article = document.getElementsByTagName('article')[0];
    _buildArticleHeaderUlSection(pages[article.id]);
}

window.addEventListener('load', _init);
