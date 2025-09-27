document.addEventListener("DOMContentLoaded", function() {
    new SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '{{ site.baseurl }}/search.json',
        searchResultTemplate: '<div class="search-result"><h3><a href="{url}">{title}</a></h3><p>{date}</p></div>'
    });
});
