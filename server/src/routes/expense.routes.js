const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense.controller.js');
const auth = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(auth()); // Protect all expense routes

router.route("/")
    .post(createExpense)
    .get(getExpenses);

router.route("/:id")
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;
