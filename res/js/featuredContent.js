`
    dependencies:
        * authorsMetadata.js
        * categoriesMetadata.js
        * pagesMetadata.js
`

function _formatTS(timestamp) {
    const [y, mId, d] = timestamp.split('-');
    const m = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
    return `${m[mId-1]} ${d}, ${y}`;
}

function _buildFeaturedCard(articleId, meta) {
    const fsec = document.getElementById('featured-section');
    const a = document.createElement('a');
    a.classList.add('ft-card');
    a.href = articleId;
    const img = document.createElement('img');
    img.src = `${articleId}/${meta.thumb_path}`;
    a.appendChild(img);
    const divA = document.createElement('div');
    divA.classList.add('ft-area');
    a.appendChild(divA);
    const divI = document.createElement('div');
    divI.classList.add('ft-info');
    const spanC = document.createElement('span');
    spanC.classList.add('ft-category');
    spanC.innerText = meta.categories[0].alias;
    divI.appendChild(spanC);
    const spanT = document.createElement('span');
    spanT.classList.add('ft-title');
    spanT.innerText = meta.title;
    divI.appendChild(spanT);
    const ul = document.createElement('ul');
    const liA = document.createElement('li');
    liA.classList.add('ft-author');
    liA.innerText = meta.authors[0].alias;
    ul.appendChild(liA);
    const liT = document.createElement('li');
    liT.classList.add('ft-ts');
    liT.innerText = _formatTS(meta.timestamp);
    ul.appendChild(liT);
    divI.appendChild(ul);
    a.appendChild(divI);
    fsec.appendChild(a);
}

function _init() {
    Object.entries(pages)
        .sort(
            (a, b) => new Date(a[1].timestamp) - new Date(b[1].timestamp)
        ).forEach(([key, value]) => {
            _buildFeaturedCard(key, value);
        });
}

window.addEventListener('load', _init);