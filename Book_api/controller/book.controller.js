var { QueryList } = require('../db/queries');
var { dbQuery } = require('../db/connection');
var {generateStoreCode} = require('../util/stringGenerator');


exports.getBookList = async (req, res) => {
  try {
    var bookListQuery = QueryList.GET_BOOK_LIST;
    var result = await dbQuery(bookListQuery);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: 'Failed to list books' });
  }

}

exports.saveNewBook = async (req, res) => {
  try {
    var createdBy = "admin";
    var createdOn = new Date();
    const { title, description, author, publisher, pages, storeCode } = req.body;
    if(!title || !author || !publisher || !storeCode){
      return res.status(500).send({ error: 'title , author , publisher , storeCode are required , can not be empty' })
  }
    values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn];
    var saveBookQuery = QueryList.SAVE_NEW_BOOK;
    await dbQuery(saveBookQuery, values);
    return res.status(201).send("Successfully book created ");
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to save book' });
  }
}


exports.getBookDetails = async (req, res) => {
  try {
    const str = req.params.bookId;
    const bookId = str.replace(/:/g, "");
    if(!bookId){
      return res.status(500).send({ error: 'bookId required , can not be empty' })
  }
    values = [bookId];
    var bookDetailsQuery = QueryList.GET_BOOK_DETAILS;
    var result = await dbQuery(bookDetailsQuery, values);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to get book details' });
  }
}

exports.updateBook = async (req, res) => {
  try {
    var createdBy = "admin";
    var createdOn = new Date();
    const str = req.params.bookId;
    const bookId = str.replace(/:/g, "");
    const { title, description, author, publisher, pages, storeCode } = req.body;
    if(!bookId || !title || !author || !publisher || !storeCode){
      return res.status(500).send({ error: ' bookId title , author , publisher , storeCode are required , can not be empty' })
  }
    values = [title, description, author, publisher, pages, storeCode, createdOn, createdBy, bookId];
    var updateBookQuery = QueryList.UPDATE_BOOK;
    await dbQuery(updateBookQuery, values);
    return res.status(201).send("book updated Successfully");
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to update book' });
  }
}


exports.deleteBook = async (req, res) => {
  try {
    const str = req.params.bookId;
    const bookId = str.replace(/:/g, "");
    if(!bookId){
      return res.status(500).send({ error: 'bookId required , can not be empty' })
  }
    values = [bookId];
    var deleteBookQuery = QueryList.DELETE_BOOK;
    await dbQuery(deleteBookQuery, values);
    return res.status(201).send("book deleted Successfully");
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to delete book' });
  }
}
