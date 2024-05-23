console.log('js');

function getKoalas() {
  console.log('in getKoalas');
  // axios call to server to get koalas
  axios.get('/koalas')
    .then(
      function (response) {
        console.log('everything is working getting 200 response');
        let data = response.data;
        console.log(data);
        renderKoalas(data);
      }).catch(
        function (error) {
          console.log('error getting koalas', error)
        }
      )
} // end getKoalas

function renderKoalas(koalaList) {
  let viewKoalas = document.querySelector('#viewKoalas');
  // console.log('koala list', koalaList);
  viewKoalas.innerHTML = '';
  for (let bears of koalaList) {
    viewKoalas.innerHTML += `
    <tr>      
      <td>${bears.name}</td>
      <td>${bears.age}</td>
      <td>${bears.color}</td>
      <td>${bears.transfer}</td>
      <td>${bears.notes}</td>
      <td><button onClick=transfer(${bears.id},${bears.transfer})>Complete Transfer</button></td>
    </tr>`;
  }
}

function saveKoala() {
  console.log('in saveKoala');
  // axios call to server to get koalas 
}

getKoalas();

function submitForm(event) {
  event.preventDefault();
  console.log('In submitForm function');

  // Get the koala info from the DOM input fields
  let koalaName = document.getElementById('nameIn').value;
  let koalaAge = document.querySelector('#ageIn').value;
  let koalaColor = document.querySelector('#colorIn').value;
  let readyForTransfer = document.querySelector('#readyForTransferIn').value;
  let koalaNotes = document.querySelector('#notesIn').value;

  // data to be posted to server
  let payload = {
    name: koalaName,
    age: koalaAge,
    color: koalaColor,
    transfer: readyForTransfer,
    notes: koalaNotes
  };

  // post to server
  axios.post('/koalas', payload)
    .then(function (response) {
      console.log('this is the result of the POST', response);
      // clear inputs
      document.querySelector('#nameIn').value = '';
      document.querySelector('#ageIn').value = '';
      document.querySelector('#colorIn').value = '';
      document.querySelector('#readyForTransferIn').value = '';
      document.querySelector('#notesIn').value = '';

      // refresh calculation history
      getKoalas();
    })
    .catch(function (error) {
      console.log('failed to post new koala', error);
      alert('something went wrong posting new koala');
    })
};

function transfer(koalaId, transfer){
  
  let payloadObject = {
    id: koalaId,
    transfer: transfer
    
  }

  axios.put(`/koalas/${koalaId}`, payloadObject)
    .then(response => {
      console.log('this is a console log', koalaId);
      getKoalas();
    })
    .catch(error => {
      console.log('error in PUT', error);
      alert('something went wrong with the transfer PUT');
    })

};
