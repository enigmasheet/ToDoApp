import React, { useState, useEffect } from 'react';
import TodoService from './TodoService';

function App() {
    const [todo, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const response = await TodoService.getTodos();
            console.log(response.data)
            setTodos(response.data || []); // Fallback to an empty array
        } catch (error) {
            console.error('Error fetching todos:', error.message || error);
        }
    };

    const handleAddTodo = async () => {
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }
        try {
            await TodoService.addTodo({ title, isCompleted });
            setTitle(''); // Reset title input
            setIsCompleted(false); // Reset checkbox
            loadTodos(); // Reload todos
        } catch (error) {
            console.error('Error adding todo:', error.message || error);
        }
    };
    console.log(todo);
    const handleDeleteTodo = async (id) => {
        try {
            await TodoService.deleteTodo(id);
            loadTodos(); // Reload todos
        } catch (error) {
            console.error('Error deleting todo:', error.message || error);
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
                {todo.length && todo.length>0 ? (
                    todo?.map((todo) => (
                        <li key={todo.id}>
                            {todo.title} - {todo.isCompleted ? 'Completed' : 'Not Completed'}
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No todos available. Add one to get started!</p>
                )}
            </ul>
        </div>
    );
}

export default App;
