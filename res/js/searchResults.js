`
    dependencies:
        * authorsMetadata.js
        * categoriesMetadata.js
        * pagesMetadata.js
`

const results = {}

function normStr(str) {
  return str
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
}

function _includeResult(path, pageinfo) {
    results[path] = pageinfo;
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

function _queryArticleContent(query) {
    Object.entries(pages).forEach(([path, pageinfo]) => {
        if(pageinfo.keywords.some((e) => normStr(e) === normStr(query))) {
            _includeResult(path, pageinfo);
        } else {
            const articleContent = pageinfo.title + ' ' + pageinfo.lead + ' ' + pageinfo.content;
            if(normStr(articleContent).includes(normStr(query))) {
                _includeResult(path, pageinfo);
            }
        }
    });
}

function _queryCategory(category_id) {
    const cat = categories[category_id];
    Object.entries(pages).forEach(([path, pageinfo]) => {
        if(pageinfo.categories.includes(cat)) {
            _includeResult(path, pageinfo);
        }
    });
}

function _queryAuthor(author_id) {
    const author = authors[author_id];
    Object.entries(pages).forEach(([path, pageinfo]) => {
        if(pageinfo.authors.includes(author)) {
            _includeResult(path, pageinfo);
        }
    });
}

function _init() {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const category_id = params.get('cat');
    const author_id = params.get('author');
    if(query != null) {
        _queryArticleContent(query);
    }
    else if(category_id != null) {
        _queryCategory(category_id);
    }
    else if(author_id != null) {
        _queryAuthor(author_id);
    }
}

window.addEventListener('load', _init);
