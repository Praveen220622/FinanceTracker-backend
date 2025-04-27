const express = require("express");
const { createTransaction, getTransactions, deleteTransaction, updateTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put('/:id', updateTransaction);


module.exports = router;
