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
    console.log(bookId);
    if(!bookId){
      return res.status(500).send({ error: 'bookId required , can not be empty' })
  }
    values = [bookId];
    var bookDetailsQuery = QueryList.GET_BOOK_DETAILS;
    var result = await dbQuery(bookDetailsQuery, values);
    console.log(result);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to get book details' });
  }
}

