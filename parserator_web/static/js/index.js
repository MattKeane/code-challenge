/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

(() => {
   const API_URL = 'http://localhost:8000/'
   // IRL I would use an environment variable for this
   const submitButton = document.querySelector('#submit');
   const addressInput = document.querySelector('#address');
   const tableBody = document.querySelector('tbody');
   const addressResults = document.querySelector('#address-results');
   const addressType = document.querySelector('#parse-type');
   const errorMessage = document.querySelector('#error-message');

   submitButton.addEventListener('click', async e => {
      try {
         e.preventDefault();
         addressResults.style.display = 'none';
         errorMessage.style.display = 'none';
         const url = API_URL + 'api/parse?address=' + addressInput.value.replace(/\s/g, '+');
         const parseAddressResponse = await fetch(url);
         const parseAddressJson = await parseAddressResponse.json();
         if (parseAddressResponse.status === 200) {
            tableBody.innerHTML = '';
            addressType.innerText = parseAddressJson.address_type;
            const addressComponents = parseAddressJson.address_components;
            for (const key in addressComponents) {
               const row = document.createElement('tr');
               const addressPart = document.createElement('td');
               addressPart.innerText = addressComponents[key];
               const tag = document.createElement('td');
               tag.innerText = key;
               row.append(addressPart);
               row.append(tag);
               tableBody.append(row);
            }
            addressResults.style.display = 'block';
         } else {
            console.log('Error!')
            errorMessage.innerText = parseAddressJson.message;
            errorMessage.style.display = 'block';
         }
      } catch (err) {
         console.log(err);
      }
   });
})();