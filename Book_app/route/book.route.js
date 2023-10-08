const express = require('express');
const router = express.Router();
const Book = require('../controller/book.controller');

router.get('/',Book.getBookList);
router.get('/:bookId',Book.getBookDetails);
router.post('/',Book.saveNewBook);

module.exports = router;