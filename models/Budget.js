const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    month: { type: String, required: true } // Format: 'YYYY-MM'
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
