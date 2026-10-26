import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3001" : "",
});

export const getBooks = () => api.get("/books");                          // GET
export const addBook = (book) => api.post("/books", book);                // POST
export const updateBook = (id, book) => api.put(`/books/${id}`, book);    // PUT (full update)
export const setAvailability = (id, available) =>
  api.patch(`/books/${id}`, { available });                               // PATCH (partial update)
export const deleteBook = (id) => api.delete(`/books/${id}`);             // DELETE
