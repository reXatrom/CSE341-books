import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  authorHasBooks,
  deleteAuthor
} from '../models/authors.js';

// GET /authors
const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('Failed to retrieve authors:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /authors/:id
const getAuthorByIdHandler = async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Failed to retrieve author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /authors
const createAuthorHandler = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;
    const currentYear = new Date().getFullYear();

    if (
      typeof id !== 'string' || !id.trim() ||
      typeof name !== 'string' || !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear < 1000 || birthYear > currentYear
    ) {
      return res.status(400).json({
        message: 'Valid id, name, and four-digit birthYear are required'
      });
    }

    const author = await createAuthor({
      id: id.trim(),
      name: name.trim(),
      birthYear
    });

    return res.status(201).json(author);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Author ID already exists' });
    }

    console.error('Failed to create author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /authors/:id
const updateAuthorHandler = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const currentYear = new Date().getFullYear();

    if (
      typeof name !== 'string' || !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear < 1000 || birthYear > currentYear
    ) {
      return res.status(400).json({
        message: 'Valid name and four-digit birthYear are required'
      });
    }

    const author = await updateAuthor(req.params.id, {
      name: name.trim(),
      birthYear
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Failed to update author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /authors/:id
const deleteAuthorHandler = async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const hasBooks = await authorHasBooks(req.params.id);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete author because books are associated with this author'
      });
    }

    await deleteAuthor(req.params.id);

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
};
