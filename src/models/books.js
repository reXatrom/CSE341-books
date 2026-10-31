import { getDb } from '../db/connect.js';

// Get all books
const getAllBooks = async () => {
  const books = await getDb()
    .collection('books')
    .find({})
    .toArray();

  return books;
};

// Get one book by its custom ID
const getBookById = async (bookId) => {
  const book = await getDb()
    .collection('books')
    .findOne({ id: bookId });

  return book;
};

export { getAllBooks, getBookById };
