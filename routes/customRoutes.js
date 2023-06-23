const express = require('express');
const { customList } = require('../controllers/customControllers');
const router = express.Router();

router.route("/:customListName")
    .get(customList);

module.exports=router;