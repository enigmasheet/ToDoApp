import axios from 'axios';

const API_URL = 'https://localhost:5110/api/todo';

// Get all todos
const getTodos = async () => {
    return await axios.get(API_URL);
};

// Get a specific todo by ID
const getTodoById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Add a new todo
const addTodo = async (todo) => {
    return await axios.post(API_URL, todo);
};

// Update an existing todo
const updateTodo = async (id, todo) => {
    return await axios.put(`${API_URL}/${id}`, todo);
};

// Delete a todo by ID
const deleteTodo = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export default {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
};
