import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectors = {
  selectEl: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

selectors.selectEl.addEventListener('change', handlerChange);

selectors.selectEl.classList.add('breed-select-hidden');
selectors.errorEl.classList.add('error-hidden');

fetchBreeds()
  .then(response => {
    selectors.selectEl.classList.remove('breed-select-hidden');
    selectors.selectEl.insertAdjacentHTML(
      'beforeend',
      createMarkupSelect(response.data)
    );
  })
  .catch(err => {
    selectors.errorEl.classList.remove('error-hidden');
  })
  .finally(() => selectors.loaderEl.classList.add('loader-hidden'));

function createMarkupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function handlerChange(evt) {
  selectors.container.classList.add('cat-info-hidden');
  selectors.loaderEl.classList.remove('loader-hidden');
  selectors.errorEl.classList.add('error-hidden');
  fetchCatByBreed(evt.target.value)
    .then(response => {
      selectors.container.classList.remove('cat-info-hidden');
      selectors.container.innerHTML = createMarkupOptions(response);
    })
    .catch(() => selectors.errorEl.classList.remove('error-hidden'))
    .finally(() => selectors.loaderEl.classList.add('loader-hidden'));
}

function createMarkupOptions(obj) {
  const { data } = obj;
  const { url } = data[0];
  const { name, description, temperament } = data[0].breeds[0];
  return `<img src="${url}" alt="${name}" width="400" height="auto"/>
  <div class="card-text">
      <h2 class="card-title">${name}</h2>
      <p class="card-description">${description}</p>
      <p class="card-temperament"><span class="bold-text">Temperament: </span>${temperament}</p></div>
  `;
}
