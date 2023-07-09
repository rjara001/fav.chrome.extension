function getSuggestions(query, suggestions) {
    var matches = [];

    if (suggestions)
      for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];
        if (suggestion)
          if (suggestion.toLowerCase().startsWith(query.toLowerCase())) {
            matches.push(suggestion);
          }
      }
    return matches;
  }
  
  function displaySuggestions(matches, callback) {
    var suggestionsList = shadowRoot.getElementById("suggestionsList");
    suggestionsList.innerHTML = ""; // Clear previous suggestions
    suggestionsList.style.display = 'block';
  
    for (var i = 0; i < matches.length; i++) {
      var suggestion = matches[i];
      var listItem = document.createElement("li");
      listItem.innerText = suggestion;
      // listItem.tabIndex = i;
      listItem.addEventListener("click", function () {
        callback(this.innerText);
    
        suggestionsList.innerHTML = ""; // Hide suggestions
        suggestionsList.style.display = 'none';
      });
      suggestionsList.appendChild(listItem);
    }
  }