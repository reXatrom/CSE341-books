import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  return await getDb()
    .collection('books')
    .find()
    .toArray();
};

const getBookById = async (bookId) => {
  return await getDb()
    .collection('books')
    .findOne({ id: bookId });
};

const createBook = async (book) => {
  await getDb()
    .collection('books')
    .insertOne(book);

  return getBookById(book.id);
};

const updateBook = async (bookId, book) => {
  const result = await getDb()
    .collection('books')
    .updateOne(
      { id: bookId },
      { $set: book }
    );

  if (result.matchedCount === 0) {
    return null;
  }

  return getBookById(bookId);
};

const deleteBook = async (bookId) => {
  const result = await getDb()
    .collection('books')
    .deleteOne({ id: bookId });

  return result.deletedCount > 0;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
