---
---
(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('results-container');

    if (results.length) {
      var appendString = '';

      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        appendString += '<div class="search-result">';
        appendString += '<h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '<p>' + item.category + ' • ' + item.date + '</p>';
        appendString += '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-input').setAttribute("value", searchTerm);

    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('category');
      this.field('date');

      for (var key in window.store) {
        this.add({
          'id': key,
          'title': window.store[key].title,
          'category': window.store[key].category,
          'date': window.store[key].date
        });
      }
    });

    var results = idx.search(searchTerm);
    displaySearchResults(results, window.store);
  }

  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      var searchTerm = e.target.value;
      
      if (searchTerm.length > 2) {
        var idx = lunr(function () {
          this.field('id');
          this.field('title', { boost: 10 });
          this.field('category');
          this.field('date');

          for (var key in window.store) {
            this.add({
              'id': key,
              'title': window.store[key].title,
              'category': window.store[key].category,
              'date': window.store[key].date
            });
          }
        });

        var results = idx.search(searchTerm);
        displaySearchResults(results, window.store);
      } else {
        document.getElementById('results-container').innerHTML = '';
      }
    });
  }
})();

// Load search data
fetch('{{ site.baseurl }}/search.json')
  .then(response => response.json())
  .then(data => {
    window.store = {};
    for (var i = 0; i < data.length; i++) {
      window.store[i] = data[i];
    }
  });