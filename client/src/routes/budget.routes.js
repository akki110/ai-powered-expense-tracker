const express = require('express');
const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budget.controller.js');
const auth = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(auth());

router.route("/")
    .post(createBudget)
    .get(getBudgets);

router.route("/:id")
    .put(updateBudget)
    .delete(deleteBudget);

module.exports = router;
