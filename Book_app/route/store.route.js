const express = require('express');
const router = express.Router();
const Store = require('../controller/store.controller');

router.get('/',Store.getStoreList);
router.post('/',Store.saveNewStore);

module.exports = router;