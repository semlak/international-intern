import axios from 'axios';

export default {
  registerUser: data => axios.post('/api/users/register', data),
  loginUser: data => axios.post('/api/users/login', data),
  logoutUser: () => axios.get('/api/users/logout'),
  getCurrentUser: () => axios.get('/api/users/getCurrentUser'),
  updateUser: data => axios.put('/api/users/' + data.id, data),

  // needs
  getNeeds: () => axios.get('/api/needs/'),
  getNeed: id => axios.get('/api/needs/' + id),
  createNeed: data => axios.post('/api/needs/', data),
  deleteNeed: id => axios.delete('/api/needs/' + id),
  saveNeed: data => axios.put('/api/needs/' + data._id, data),

  // expenses
  newExpense: data => axios.post('/api/expenses/', data),
  getExpenses: () => axios.get('/api/expenses/'),
  updateExpense: data => axios.put('/api/expenses/' + data._id, data),
  deleteExpense: id => axios.delete('/api/expenses/' + id),

  // weather
  getWeather: queryURL => axios.get(queryURL),

  //chapters
  addChapter: data => axios.post('/api/chapters/', data),
  getChapters: () => axios.get('/api/chapters/'),
  updateChapter: data => axios.put('/api/chapters/' + data._id, data),
  deleteChapter: id => axios.delete('/api/chapters/' +id)
};