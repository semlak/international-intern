import axios from "axios";

export default {
  // Gets all books
  getBooks: () => axios.get("/api/books"),
  
  // Gets the book with the given id
  getBook: (id) => axios.get("/api/books/" + id),

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },

  registerUser: data => axios.post("/api/users/register", data),
  loginUser: data => axios.post("/api/users/login", data),
  logoutUser: () => axios.get("/api/users/logout"),
  getCurrentUser: () => axios.get("/api/users/getCurrentUser"),
  updateUser: data => axios.put("/api/users/" + data.id, data),

  // needs
  getNeeds: () => axios.get("/api/needs/"),
  getNeed: id => axios.get("/api/needs/" + id),
  createNeed: data => axios.post("/api/needs/", data),
  deleteNeed: id => axios.delete("/api/needs/" + id),
  saveNeed: data => axios.put("/api/needs/" + data._id, data),
};
