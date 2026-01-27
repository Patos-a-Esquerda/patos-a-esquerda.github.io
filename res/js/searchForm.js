const _searchSection = document.getElementById('search-section');
const _searchInput = _searchSection.getElementsByTagName('input')[0];
const _searchButton = _searchSection.getElementsByTagName('button')[0];

function _search() {
    const query = _searchInput.value;
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    _searchInput.value = '';
}

_searchButton.addEventListener('click', _search);
