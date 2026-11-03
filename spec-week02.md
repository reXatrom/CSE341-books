## Feature 2: Author CRUD Operations

### Goal
Create an authors API that allows clients to create, retrieve, update, and delete author records. Each author will have a custom string ID, name, and birth year. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom ID such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will continue to use custom string IDs instead of MongoDB `_id` values for route parameters.

### Relationship to Books
Books will reference authors through the `authorId` field. The `authorId` value must match the custom `id` of an existing author.

An author who still has books referencing their ID must not be deleted. The API should return a `409` status code when a client attempts to delete such an author.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by their custom ID.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Maya Rivera",
      "birthYear": 1985
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing or invalid
- `400` if the author ID already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
      "name": "Maya Rivera Updated",
      "birthYear": 1986
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing or invalid
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that ID
- `409` if the author still has books referencing their ID
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every author route, including request bodies, path parameters, success responses, and error responses.

### Deployment Expectations
After implementation, all author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.














# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 Books API so book documents include a reference to an author and the API supports all CRUD operations. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, unique custom ID such as `b1`
- `authorId`: string, required, references the custom `id` of an existing author
- `title`: string, required
- `publicationDate`: string, required, formatted as `YYYY-MM-DD`

MongoDB will continue to generate its own `_id` values, but API route parameters will use custom string IDs.

The custom `id` field must have a unique index in MongoDB.

### Relationship to Authors
Each book must identify its author using the `authorId` field.

The `authorId` must match the custom `id` of an existing author document.

When creating or updating a book:
- The API must verify that the referenced author exists.
- If the author does not exist, return `400 Bad Request`.
- Books must not store the author's name directly.

An author cannot be deleted while books reference their ID.

### Validation Rules
- All required fields must be provided.
- String fields must not be empty or contain only whitespace.
- Book IDs must be unique.
- Book IDs must not be changed during updates.
- `publicationDate` must be a valid calendar date in `YYYY-MM-DD` format.
- `authorId` must reference an existing author.
- Invalid request data must be rejected before database changes are made.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects.

Errors:
- `500` if an unexpected server or database error occurs.

#### GET /books/:id
Purpose: Return one book by its custom ID.

Success:
- Status code: `200`
- Response body: the matching book object.

Errors:
- `404` if no book exists with that ID.
- `500` if an unexpected server or database error occurs.

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object.

Errors:
- `400` if a required field is missing or invalid.
- `400` if the custom book ID already exists.
- `400` if the author ID does not match an existing author.
- `500` if an unexpected server or database error occurs.

#### PUT /books/:id
Purpose: Update an existing book using its custom ID.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object.

Errors:
- `400` if a required field is missing or invalid.
- `400` if the supplied author ID does not match an existing author.
- `404` if no book exists with that ID.
- `500` if an unexpected server or database error occurs.

The custom book ID cannot be changed through this route.

All three update fields are required.

#### DELETE /books/:id
Purpose: Delete an existing book using its custom ID.

Success:
- Status code: `204`
- Response body: none.

Errors:
- `404` if no book exists with that ID.
- `500` if an unexpected server or database error occurs.

### Error Response Format
All JSON error responses must use a consistent structure:

    {
      "message": "Book not found"
    }

Internal database errors and stack traces must not be exposed to API clients.

### Swagger Documentation
Swagger must document all five book routes:
- GET `/books`
- GET `/books/{id}`
- POST `/books`
- PUT `/books/{id}`
- DELETE `/books/{id}`

Documentation must include summaries, parameters, request body schemas, success responses, error responses, and JSON examples where appropriate.

### Deployment Expectations
All book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow users to test every book route from the browser.

---

## Feature 2: Author CRUD Operations

### Goal
Create an Authors API that allows clients to create, retrieve, update, and delete author records. Each author will have a custom string ID, name, and birth year. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, unique custom ID such as `a1`
- `name`: string, required
- `birthYear`: number, required, four-digit year not greater than the current calendar year.

MongoDB will generate its own `_id` values, but API route parameters will use custom string IDs.

The custom `id` field must have a unique index in MongoDB.

### Relationship to Books
Books will reference authors through the `authorId` field.

The `authorId` value must match the custom `id` of an existing author.

An author cannot be deleted while one or more books reference their ID.

If a client attempts to delete an author who still has associated books, the API must return `409 Conflict`. The author and associated books must remain unchanged.

### Validation Rules
- All required fields must be provided.
- Author IDs must be strings and must not be empty.
- Author IDs must be unique.
- Author IDs must not be changed during updates.
- Author names must be non-empty strings.
- Birth years must be integers containing exactly four digits.
- Birth years must not be greater than the current calendar year.
- Invalid request data must be rejected before database changes are made.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects.

Errors:
- `500` if an unexpected server or database error occurs.

#### GET /authors/:id
Purpose: Return one author by their custom ID.

Success:
- Status code: `200`
- Response body: the matching author object.

Errors:
- `404` if no author exists with that ID.
- `500` if an unexpected server or database error occurs.

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Maya Rivera",
      "birthYear": 1985
    }

Success:
- Status code: `201`
- Response body: the newly created author object.

Errors:
- `400` if a required field is missing or invalid.
- `400` if the custom author ID already exists.
- `500` if an unexpected server or database error occurs.

#### PUT /authors/:id
Purpose: Update an existing author using their custom ID.

Request body:

    {
      "name": "Maya Rivera Updated",
      "birthYear": 1986
    }

Success:
- Status code: `200`
- Response body: the updated author object.

Errors:
- `400` if a required field is missing or invalid.
- `404` if no author exists with that ID.
- `500` if an unexpected server or database error occurs.

The custom author ID cannot be changed through this route.

Both `name` and `birthYear` are required.

#### DELETE /authors/:id
Purpose: Delete an existing author using their custom ID.

Success:
- Status code: `204`
- Response body: none.

Errors:
- `404` if no author exists with that ID.
- `409` if one or more books still reference the author's ID.
- `500` if an unexpected server or database error occurs.

The API must check for associated books before deleting an author. If books reference the author, deletion must be rejected and no records should be changed.

### Error Response Format
All JSON error responses must use a consistent structure:

    {
      "message": "Author not found"
    }

For example, an author with associated books must return:

    {
      "message": "Author cannot be deleted because books still reference this author"
    }

Internal database errors and stack traces must not be exposed to API clients.

### Swagger Documentation
Swagger must document all five author routes:
- GET `/authors`
- GET `/authors/{id}`
- POST `/authors`
- PUT `/authors/{id}`
- DELETE `/authors/{id}`

Documentation must include summaries, parameters, request body schemas, success responses, error responses, and JSON examples where appropriate.

### Deployment Expectations
All author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow users to test every author route from the browser.

---

## General API Requirements

These requirements apply to both Books and Authors APIs:

1. Use appropriate HTTP methods and status codes for all operations.
2. Validate incoming request data before database operations.
3. Enforce unique custom IDs using MongoDB unique indexes.
4. Use consistent JSON error responses.
5. Do not expose sensitive database details or stack traces.
6. Keep book-author relationships valid by preventing deletion of authors who still have associated books.
7. Document all API endpoints using OpenAPI 3.0.0 and Swagger UI.
8. Test successful requests and expected error responses locally and after deployment.