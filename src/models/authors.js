import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
  const authors = await getDb()
    .collection('authors')
    .find()
    .toArray();

  return authors;
};

const getAuthorById = async (authorId) => {
  const author = await getDb()
    .collection('authors')
    .findOne({ id: authorId });

  return author;
};

const createAuthor = async (author) => {
    await getDb()
    .collection('authors')
    .insertOne(author);

  return getAuthorById(author.id);
};

const updateAuthor = async (authorId, author) => {
  const result = await getDb()
    .collection('authors')
    .updateOne(
      { id: authorId },
      { $set: author }
    );

  if (result.matchedCount === 0) {
    return null;
  }

  return getAuthorById(authorId);
};

const authorHasBooks = async (authorId) => {
  const book = await getDb()
    .collection('books')
    .findOne({ authorId });

  return book !== null;
};

const deleteAuthor = async (authorId) => {
  const result = await getDb()
    .collection('authors')
    .deleteOne({ id: authorId });

  return result.deletedCount > 0;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  authorHasBooks,
  deleteAuthor
};
