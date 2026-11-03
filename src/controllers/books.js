import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../models/books.js';

import { getAuthorById } from '../models/authors.js';

const isValidDate = (date) => {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  return !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date;
};

const isValidBook = async (book) => {
  if (
    typeof book.authorId !== 'string' || !book.authorId.trim() ||
    typeof book.title !== 'string' || !book.title.trim() ||
    !isValidDate(book.publicationDate)
  ) {
    return false;
  }

  const author = await getAuthorById(book.authorId.trim());
  return Boolean(author);
};

// GET /books
const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Failed to retrieve books:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /books/:id
const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to retrieve book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /books
const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    if (
      typeof id !== 'string' || !id.trim() ||
      !await isValidBook({ authorId, title, publicationDate })
    ) {
      return res.status(400).json({
        message: 'Valid id, authorId, title, and publicationDate are required'
      });
    }

    const book = await createBook({
      id: id.trim(),
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate
    });

    return res.status(201).json(book);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Book ID already exists' });
    }

    console.error('Failed to create book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /books/:id
const updateBookHandler = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body;

    if (!await isValidBook({ authorId, title, publicationDate })) {
      return res.status(400).json({
        message: 'Valid authorId, title, and publicationDate are required'
      });
    }

    const book = await updateBook(req.params.id, {
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to update book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /books/:id
const deleteBookHandler = async (req, res) => {
  try {
    const deleted = await deleteBook(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};
