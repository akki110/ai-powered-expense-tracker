const express = require('express');
const { generateExport, getRecentExports } = require('../controllers/export.controller.js');
const auth = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(auth());

router.route("/")
    .post(generateExport)
    .get(getRecentExports);

module.exports = router;
