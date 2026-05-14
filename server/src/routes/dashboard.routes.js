const express = require('express');
const { getDashboardData } = require('../controllers/dashboard.controller.js');
const auth = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(auth());
router.get('/', getDashboardData);

module.exports = router;
