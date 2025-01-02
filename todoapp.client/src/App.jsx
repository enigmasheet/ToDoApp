import React, { useState, useEffect } from 'react';
import TodoService from './TodoService';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const response = await TodoService.getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        if (!title.trim()) return alert('Please enter a title');
        try {
            await TodoService.addTodo({ title, isCompleted });
            setTitle('');
            setIsCompleted(false);
            loadTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await TodoService.deleteTodo(id);
            loadTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    Completed
                </label>
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} - {todo.isCompleted ? 'Completed' : 'Not Completed'}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
