import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const TodoItem = ({ item, deleteTodo, checkTodo }) => {
	const { id, done, task } = item;

	const handleDelete = () => deleteTodo(id);
	const handleCheck = () => checkTodo(id);

	const itemStyle = done ? { opacity: 0.4 } : { opacity: 1 };

	const textStyle = done
		? { textDecoration: 'line-through' }
		: { textDecoration: 'none' };
	return (
		<div className="todo-item" style={itemStyle}>
			<span className="todo-item-check">
				<input type="checkbox" checked={done} onChange={handleCheck} />
			</span>

			<span className="todo-item-text" style={textStyle}>
				{task}
			</span>

			<span className="todo-item-delete">
				<FaRegTrashAlt onClick={handleDelete} />
			</span>
		</div>
	);
};

export default TodoItem;
