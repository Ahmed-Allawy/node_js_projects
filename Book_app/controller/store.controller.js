var { QueryList } = require('../db/queries');
var { dbQuery } = require('../db/connection');
var {generateStoreCode} = require('../util/stringGenerator');


exports.getStoreList = async (req, res) => {
  try {
    var storeListQuery = QueryList.GET_STORE_LIST;
    var result = await dbQuery(storeListQuery);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).send({ error: 'Failed to list store' });
  }

}

exports.saveNewStore = async (req, res) => {
  try {
    var createdBy = "admin";
    var createdOn = new Date();
    const { storeName, address } = req.body;
    if (!storeName || !address) {
      return res.status(500).send({ error: 'store name and address are required , can not empty' })
    }
    let storeCode = generateStoreCode();

    values = [storeName, storeCode, address, createdBy, createdOn];
    var saveStoreQuery = QueryList.SAVE_NEW_STORE;
    await dbQuery(saveStoreQuery, values);
    return res.status(201).send("Successfully store created ");
  } catch (error) {
    console.log("Error : " + error);
    return res.status(500).send({ error: 'Failed to list store' });
  }
}

