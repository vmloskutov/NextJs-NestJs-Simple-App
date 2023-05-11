import { useState } from 'react';

interface Todo {
    id?: number;
    title: string;
    completed?: boolean;
}

interface TodoFormProps {
    addTodo: (newTodo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === '') {
            return;
        }
        const newTodo: Todo = {
            title: title
        };
        addTodo(newTodo);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
