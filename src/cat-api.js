import axios, { Axios } from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_FOsdBiZasusLPMtArKEDkTg4NqjPTPZR5Y9UqXDFxkFKFZgdoyIsUNItezq739n1';

const BASE_URL = 'https://api.thecatapi.com/v1';
const FIRST_POINT = '/breeds';
const SECOND_POINT = '/images/search';

function fetchBreeds() {
  return axios.get(`${BASE_URL}${FIRST_POINT}`);
}

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${BASE_URL}${SECOND_POINT}?${params}`);
}

export { fetchBreeds, fetchCatByBreed };
