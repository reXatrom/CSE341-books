import express from 'express';
import { getDb } from './src/db/connect.js';
import { ObjectId } from 'mongodb';

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Server is running'
  });
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await getDb()
      .collection('books')
      .find({})
      .toArray();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Failed to retrieve books:', error.message);

    return res.status(500).json({
      message: 'Failed to retrieve books'
    });
  }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid book ID'
      });
    }

    const book = await getDb()
      .collection('books')
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to retrieve book:', error.message);

    return res.status(500).json({
      message: 'Failed to retrieve book'
    });
  }
});

export default app;