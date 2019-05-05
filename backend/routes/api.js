const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/getAllBooks', bookController.getAllBooks);
router.post('/addBook', bookController.addBook);
router.get('/getBookDetail/:id', bookController.getBookDetail);
router.put('/updateBook', bookController.updateBook);

module.exports = router;