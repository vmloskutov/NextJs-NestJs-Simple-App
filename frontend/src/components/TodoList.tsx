import React from 'react';
import { createUseStyles } from 'react-jss';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    completeTodo: (id: number) => void; // Add completeTodo function prop
}

const useStyles = createUseStyles({
    completed: {
        textDecoration: 'line-through',
    },
});


const TodoList: React.FC<TodoListProps> = ({ todos, completeTodo }) => {
    const classes = useStyles();

    const handleComplete = (id: number) => {
        completeTodo(id);
    };

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? classes.completed : ''}>
                    <span>{todo.title}</span>
                    {!todo.completed && (
                        <button onClick={() => handleComplete(todo.id)}>
                            Complete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
