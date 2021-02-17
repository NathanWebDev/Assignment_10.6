'use strict';

function getUsername(userName){
  fetch(`https://api.github.com/users/${userName}/repos`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
  $('#js-error-message').empty();
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
  $('#results-list').append(
  `<li><h1>${responseJson[i].name}</h1>
  <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>`
  )};
  $('#results').removeClass('hidden');
};

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userName = $('#js-search-term').val();
      getUsername(userName);
      console.log('watchForm Ran');
    });
}

$(watchForm);