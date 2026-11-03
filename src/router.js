
import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler
} from './controllers/books.js';

import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
} from './controllers/authors.js';

const router = express.Router();

// Books routes

router.get('/books', getBooksHandler);


/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

router.get('/books/:id', getBookByIdHandler);

// Authors routes

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *       500:
 *         description: Internal server error
 */

router.get('/authors', getAuthorsHandler);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retrieve an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       200:
 *         description: Author retrieved successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

router.get('/authors/:id', getAuthorByIdHandler);



/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: John Smith
 *               birthYear:
 *                 type: integer
 *                 example: 1988
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid input or duplicate author ID
 *       500:
 *         description: Internal server error
 */

router.post('/authors', createAuthorHandler);



/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: a1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maya Rivera Updated
 *               birthYear:
 *                 type: integer
 *                 example: 1986
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

router.put('/authors/:id', updateAuthorHandler);



/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Cannot delete author because books are associated with this author
 *       500:
 *         description: Internal server error
 */

router.delete('/authors/:id', deleteAuthorHandler);

export default router;
