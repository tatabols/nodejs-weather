const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const button = document.querySelector('button');
const address = document.querySelector('#address');
const temp = document.querySelector('#temp');
const min = document.querySelector('#min');
const max = document.querySelector('#max');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  button.innerHTML = 'loading...';

  fetch('/weather?address=' + search.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      address.textContent = data.address;
      temp.textContent = data.temp;
      min.textContent = data.temp_min;
      max.textContent = data.temp_max;
    })
    .catch((err) => {
      address.textContent = err;
    })
    .finally(() => {
      search.value = '';
      button.innerHTML = 'Search';
    });
});
