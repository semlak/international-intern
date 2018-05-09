import axios from 'axios';

const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export default {
  registerUser: data => axios.post('/api/users/register', data),
  loginUser: data => axios.post('/api/users/login', data),
  logoutUser: () => axios.get('/api/users/logout'),
  getCurrentUser: () => axios.get('/api/users/getCurrentUser'),
  updateUser: data => axios.put(`/api/users/${data.id}`, data),

  // needs
  getNeeds: () => axios.get('/api/needs/'),
  getNeed: id => axios.get(`/api/needs/${id}`),
  createNeed: data => axios.post('/api/needs/', data),
  deleteNeed: id => axios.delete(`/api/needs/${id}`),
  saveNeed: data => axios.put(`/api/needs/${data._id}`, data),

  // expenses
  newExpense: data => axios.post('/api/expenses/', data),
  getExpenses: () => axios.get('/api/expenses/'),
  updateExpense: data => axios.put(`/api/expenses/${data._id}`, data),
  deleteExpense: id => axios.delete(`/api/expenses/${id}`),

  // weather
  getWeather: queryURL => axios.get(queryURL),

  // currency
  getCurrency: queryURL => axios.get(queryURL),

  // get currency and country codes from country names
  // getCountryCodes: countryNames => axios.get(`/api/countries?country_names=${countryNames.join(',')}`),
  getAllCountryData: () => makeCancelable(axios.get('/api/countries/?getall=true')),

  // chapters
  addChapter: data => axios.post('/api/chapters/', data),
  getChapters: () => axios.get('/api/chapters/'),
  updateChapter: data => axios.put(`/api/chapters/${data._id}`, data),
  deleteChapter: id => axios.delete(`/api/chapters/${id}`),

  // images
  addImage: data => axios.post('/api/images/', data),
  getImages: () => axios.get('/api/images/'),

  // NYT search
  search: query => axios.get(query),


};
