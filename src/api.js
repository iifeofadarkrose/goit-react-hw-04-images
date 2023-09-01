const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37695850-4d249e88305a79ea73cd9b048';

export const searchImages = (searchWord, page) => {
  return fetch(
    `${BASE_URL}?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
