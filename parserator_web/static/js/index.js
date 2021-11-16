/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

(() => {
   const API_URL = 'http://localhost:8000/'
   // IRL I would use an environment variable for this
   const submitButton = document.querySelector('#submit');
   const addressInput = document.querySelector('#address');

   submitButton.addEventListener('click', async e => {
      e.preventDefault();
      const url = API_URL + 'api/parse?address=' + addressInput.value.replace(/\s/g, '+');
      const parseAddressResponse = await fetch(url);
      const parseAddressJson = await parseAddressResponse.json();
      console.log(parseAddressJson);
   });
})();