import React, { useState } from "react";
import "./index.css"; // Import the updated CSS file

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Chapo", description: "Wednesday's Lunch", category: "Food", amount: 25, date: "2025-04-08" },
    { id: 2, name: "Rent", description: "Apartment", category: "Personal", amount: 45000, date: "2025-04-07" },
    { id: 3, name: "Gym", description: "Execrise", category: "Growth", amount: 4500, date: "2025-04-05" },
  ]);

  const [newExpense, setNewExpense] = useState({
    id: null,
    name: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === newExpense.id ? { ...newExpense, amount: parseFloat(newExpense.amount) } : expense
        )
      );
      setIsEditing(false);
    } else {
      const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
      setExpenses([...expenses, { ...newExpense, id: newId, amount: parseFloat(newExpense.amount) }]);
    }
    setNewExpense({ id: null, name: "", description: "", category: "", amount: "", date: "" });
  };

  const handleEdit = (expense) => {
    setNewExpense(expense);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="tracker-container">
      <div className="form-section">
        <h2 className="form-title">Expense Tracker</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="text"
            name="name"
            value={newExpense.name}
            onChange={handleInputChange}
            placeholder="Title"
            className="form-input"
          />
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="form-input"
          />
          <input
            type="text"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="form-input"
          />
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="form-input"
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="form-input"
          />
          <button type="submit" className="form-submit-button">
            {isEditing ? "Update Expense" : "Submit"}
          </button>
        </form>
      </div>

      <div className="table-section">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="description-column">Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td className="description-column">{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(expense)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTracker;
