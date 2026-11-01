
import { getDb } from '../db/connect.js';

// Get all books
const getAllBooks = async () => {
  const books = await getDb()
    .collection('books')
    .find({})
    .toArray();

  return books;
};

export { getAllBooks };
