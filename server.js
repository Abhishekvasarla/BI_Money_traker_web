const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/expense-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const expenseSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    date: String
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.post('/api/expenses', async (req, res) => {
    const { category, amount, date } = req.body;
    const expense = new Expense({ category, amount, date });
    await expense.save();
    res.send(expense);
});

app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find();
    res.send(expenses);
});

app.delete('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.send({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
