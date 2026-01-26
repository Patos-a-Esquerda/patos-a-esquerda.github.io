`
    dependencies:
        * authorsMetadata.js
        * categoriesMetadata.js
        * pagesMetadata.js
`

function _showResult(path, pageinfo) {
    const resultSection = document.getElementById('results');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    a.classList.add('search-result');
    a.href = path;
    img.src = `${path}/${pageinfo.thumb_path}`;
    h1.innerText = pageinfo.title;
    p.innerText = pageinfo.lead;
    a.appendChild(img);
    div.append(h1);
    div.append(p);
    a.appendChild(div);
    resultSection.appendChild(a);
}

function _fetchCategory(category_id) {
    const cat = categories[category_id];
    Object.entries(pages).forEach(([path, pageinfo]) => {
        if(pageinfo.categories.includes(cat)) {
            _showResult(path, pageinfo);
        }
    })
}

function _fetchAuthor(author_id) {
    const author = authors[author_id];
    Object.entries(pages).forEach(([path, pageinfo]) => {
        if(pageinfo.authors.includes(author)) {
            _showResult(path, pageinfo);
        }
    })
}

function _init() {
    const params = new URLSearchParams(location.search);
    const category = params.get('cat');
    const author = params.get('author');
    if(category != null) {
        _fetchCategory(category);
    }
    if(author != null) {
        _fetchAuthor(author);
    }
}

window.addEventListener('load', _init);
