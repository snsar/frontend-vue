import instance from "../axios";

function getAllBooksAPI() {
  return instance.get(`books`);
}

// Function to get a book by ID
function getBookByIdAPI(id) {
  return instance.get(`books/${id}`);
}

// Function to add a new book
function addBookAPI(formData) {
  return instance.post(`books`, formData);
}

// Function to update a book
function updateBookAPI(id, formData) {
  //   const formData = new FormData();
  //   formData.append("coverImage", coverImage);
  //   formData.append("title", title);
  //   formData.append("author", author);
  //   formData.append("category", category);
  //   formData.append("releaseDate", releaseDate);
  //   formData.append("pageCount", pageCount);
  //   formData.append("soldCount", soldCount);

  return instance.put(`books/${id}`, formData);
}

// Function to delete a book
function deleteBookAPI(id) {
  return instance.delete(`books/${id}`);
}

export {
  getAllBooksAPI,
  getBookByIdAPI,
  addBookAPI,
  updateBookAPI,
  deleteBookAPI,
};
