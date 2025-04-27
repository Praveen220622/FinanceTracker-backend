const Budget = require("../models/Budget");

// Create a new budget for a category and month
exports.createBudget = async (req, res) => {
    try {
        const { category, limit, month } = req.body;

        if (!category || !limit || !month) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingBudget = await Budget.findOne({ category, month });
        if (existingBudget) {
            return res.status(400).json({ message: "Budget already exists for this category and month" });
        }

        const budget = await Budget.create({ category, limit, month });
        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all budgets
exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ month: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing budget
exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit } = req.body;

        if (!limit) {
            return res.status(400).json({ message: "Limit is required" });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(id, { limit }, { new: true });

        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
