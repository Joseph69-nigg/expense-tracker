import React, { useState } from "react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Lunch at Cafe", category: "Food", amount: 800, date: "2025-04-10" },
    { id: 2, name: "Electricity Bill", category: "Utilities", amount: 2500, date: "2025-04-12" },
    { id: 3, name: "Gym Membership", category: "Health", amount: 4000, date: "2025-04-13" },
  ]);

  const [newExpense, setNewExpense] = useState({
    id: null,
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  // Add or update an expense
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
    setNewExpense({ id: null, name: "", category: "", amount: "", date: "" });
  };

  // Edit an expense
  const handleEdit = (expense) => {
    setNewExpense(expense);
    setIsEditing(true);
  };

  // Delete an expense
  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Expense Name</label>
          <input
            type="text"
            name="name"
            value={newExpense.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="E.g., Coffee, Rent, etc."
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="E.g., Food, Utilities, Health"
          />
        </div>
        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="E.g., 1200"
          />
        </div>
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Amount</th>
            <th className="border border-gray-200 p-2">Date</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{expense.name}</td>
              <td className="border border-gray-200 p-2">{expense.category}</td>
              <td className="border border-gray-200 p-2">{expense.amount}</td>
              <td className="border border-gray-200 p-2">{expense.date}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;

