import React, {useEffect, useState} from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/todos');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (newTodo: Todo) => {
        try {
            const response = await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            const createdTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const completeTodo = async (id: number) => {

        try {
            const response = await fetch(`http://localhost:3000/todos/${id}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const completedTodo = await response.json();
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? {...todo, ...completedTodo} : todo
                )
            );
        } catch (error) {
            console.error('Error completing todo:', error);
        }


    };

    return (
        <div>
            <h1>Todo App</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} completeTodo={completeTodo} />
        </div>
    );
};

export default TodoPage;
