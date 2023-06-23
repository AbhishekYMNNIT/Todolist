const express = require('express');
const { getItems, postItems, deleteItems } = require('../controllers/itemControllers');
const router = express.Router();

router.route('/')
    .get(getItems)
    .post(postItems);

router.route('/delete')
    .post(deleteItems);


module.exports=router;