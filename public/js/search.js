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
    document.getElementById('search-box').setAttribute("value", searchTerm);
  
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
        this.field('title', { boost: 10 });
        this.field('content', { boost: 20 });
    });
  
    for (var key in window.store) { // Add the data to lunr
        idx.add({
            'title': window.store[key].title,
            'content': window.store[key].content
        });
  
        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store); // We'll write this in the next section
    }
}